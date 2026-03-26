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
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    user.banned = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User banned successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    user.banned = false;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User unbanned successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const banHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found"
      });
    }
    hospital.banned = true;
    await hospital.save();
    res.status(200).json({
      success: true,
      message: "Hospital banned successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const unbanHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found"
      });
    }
    hospital.banned = false;
    await hospital.save();
    res.status(200).json({
      success: true,
      message: "Hospital unbanned successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};