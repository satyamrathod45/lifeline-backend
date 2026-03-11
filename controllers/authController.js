import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER USER
export const registerUser = async (req, res) => {

  try {

    const {
      name,
      phone,
      email,
      password,
      role,
      bloodGroup,
      isDonor,
      city,
      area,
      coordinates
    } = req.body;

    // check existing user
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role: role || "user",
      isDonor: isDonor || false,
      bloodGroup: isDonor ? bloodGroup : undefined,
      city,
      area,
      location: {
        type: "Point",
        coordinates
      }
    });

    await newUser.save();

    // remove password from response
    const userData = newUser.toObject();
    delete userData.password;

    // create token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: userData
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};



// LOGIN USER
export const loginUser = async (req, res) => {

  try {

    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        bloodGroup: user.bloodGroup,
        isDonor: user.isDonor,
        donorAvailability: user.donorAvailability
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};



// LOGOUT
export const logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    success: true,
    message: "Logged out successfully"
  });

};



// GET PROFILE
export const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};



// BECOME DONOR
export const becomeDonor = async (req, res) => {

  try {

    const { bloodGroup } = req.body;

    const user = await User.findById(req.user.id);

    user.isDonor = true;
    user.bloodGroup = bloodGroup;
    user.donorAvailability = true;

    await user.save();

    res.json({
      success: true,
      message: "You are now registered as a donor 🩸"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message

    });

  }

};



// TOGGLE DONOR AVAILABILITY
export const toggleDonorAvailability = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    user.donorAvailability = !user.donorAvailability;

    await user.save();

    res.json({
      success: true,
      donorAvailability: user.donorAvailability
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

