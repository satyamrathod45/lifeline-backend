import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

  try {
    const {
      name,
      phone,
      email,
      password,
      role,
      bloodGroup,
      city,
      area,
      coordinates
    } = req.body;

    // check existing user
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
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
      role,
      bloodGroup,
      city,
      area,
      location: {
        type: "Point",
        coordinates
      }
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};

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

    // create token
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
})

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        bloodGroup: user.bloodGroup
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

export const logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    message: "Logged out successfully"
  });
};

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