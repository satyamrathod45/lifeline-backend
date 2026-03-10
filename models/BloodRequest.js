import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema({

  patientName: {
    type: String,
    required: true
  },

  bloodGroup: {
    type: String,
    required: true
  },

  hospital: {
    type: String,
    required: true
  },

  city: {
    type: String
  },

  area: {
    type: String
  },

  unitsNeeded: {
    type: Number,
    default: 1
  },

  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending"
  },

  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },

    coordinates: {
      type: [Number]
    }
  }

}, { timestamps: true });

bloodRequestSchema.index({ location: "2dsphere" });

export default mongoose.model("BloodRequest", bloodRequestSchema);