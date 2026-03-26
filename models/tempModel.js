// models/TempUser.js

import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  otp: String,
  otpExpiry: Number
});

export default mongoose.model("TempUser", tempUserSchema);