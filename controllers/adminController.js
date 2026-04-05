import Hospital from "../models/Hospital.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createHospital = async (req, res) => {
  try {
    const {
      hospitalName,
      phone,
      email,
      password,
      licenseNumber,    
      city,
      area,
      address,
      coordinates
    } = req.body;

    // Check if hospital already exists
    const existingHospital = await Hospital.findOne({ phone });
    if (existingHospital) {
      return res.status(400).json({
        success: false,
        message: "Hospital already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newHospital = new Hospital({
      hospitalName,
      phone,
      email,
      password: hashedPassword,
      licenseNumber,
      city,
      area,
      address,
      location: {
        type: "Point",
        coordinates
      }
    });

    await newHospital.save();

    // Remove password from response
    const hospitalData = newHospital.toObject();
    delete hospitalData.password;

    res.status(201).json({
      success: true,
      message: "Hospital created successfully",
      hospital: hospitalData
    });

  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpiry");
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().select("-password -otp -otpExpiry");
    res.status(200).json({
      success: true,
      hospitals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isBanned: true },
      { returnDocument: "after" }
    );

    res.json({ message: "User banned", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isBanned: false },
      { returnDocument: "after" }
    );

    res.json({ message: "User unbanned", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const banHospital = async (req, res) => {
  try {
    
    const {id} = req.params;
    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { isBanned: true },
      { returnDocument: "after" } // ✅ updated
    );
    res.json({ message: "Hospital banned", hospital: hospital });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ message: error.message });
  }
};

export const unbanHospital = async (req, res) => {
  try {
    const {id} = req.params;
    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { isBanned: false },
      { returnDocument: "after" } // ✅ updated
    );

    res.json({ message: "Hospital unbanned", hospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};