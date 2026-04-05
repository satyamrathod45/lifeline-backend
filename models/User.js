import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const bloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const roles = ["user", "admin", "hospital", "bloodbank"];

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6-9]\d{9}$/, "Enter valid Indian phone"]
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"]
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  role: {
    type: String,
    enum: roles,
    default: "user"
  },

  bloodGroup: {
    type: String,
    enum: bloodGroups
  },

  isDonor: {
    type: Boolean,
    default: false
  },

  city: String,
  area: String,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  },

  donorAvailability: {
    type: Boolean,
    default: false
  },
  isBanned: {
  type: Boolean,
  default: false
},

  verificationStatus: {
    type: String,
    enum: ["unverified", "report_uploaded", "hospital_verified"],
    default: "unverified"
  },

  reportImage: String,
  lastDonationDate: Date,

  // 🔐 reset fields
  resetPasswordToken: String,
  resetPasswordExpire: Date

}, { timestamps: true });

userSchema.index({ location: "2dsphere" });


// 🔍 compare password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);