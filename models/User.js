import mongoose from "mongoose";

const bloodGroups = [
  "A+","A-",
  "B+","B-",
  "AB+","AB-",
  "O+","O-"
];

const roles = ["donor", "receiver", "admin"];

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"]
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },

  role: {
    type: String,
    enum: roles,
    default: "receiver"
  },

  bloodGroup: {
    type: String,
    enum: bloodGroups,
    required: function () {
      return this.role === "donor";
    }
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

  available: {
    type: Boolean,
    default: true
  },

  verificationStatus: {
    type: String,
    enum: ["unverified", "report_uploaded", "hospital_verified"],
    default: "unverified"
  },

  reportImage: {
    type: String
  },

  lastDonationDate: {
    type: Date
  }

}, { timestamps: true });

userSchema.index({ location: "2dsphere" });

export default mongoose.model("User", userSchema);