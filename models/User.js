import mongoose from "mongoose";

const bloodGroups = [
  "A+","A-",
  "B+","B-",
  "AB+","AB-",
  "O+","O-"
];

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

  city: {
    type: String,
    trim: true
  },

  area: {
    type: String,
    trim: true
  },

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

  verificationStatus: {
    type: String,
    enum: ["unverified", "report_uploaded", "hospital_verified"],
    default: "unverified"
  },

  reportImage: String,

  lastDonationDate: Date

}, { timestamps: true });

userSchema.index({ location: "2dsphere" });

export default mongoose.model("User", userSchema);