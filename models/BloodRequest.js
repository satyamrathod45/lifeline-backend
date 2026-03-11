import mongoose from "mongoose";

const bloodGroups = [
  "A+","A-",
  "B+","B-",
  "AB+","AB-",
  "O+","O-"
];

const bloodRequestSchema = new mongoose.Schema({

  patientName: {
    type: String,
    required: [true,"Patient name is required"],
    trim: true,
    minlength: [2,"Name must be at least 2 characters"]
  },

  bloodGroup: {
    type: String,
    enum: bloodGroups,
    required: [true,"Blood group is required"]
  },

  hospital: {
    type: String,
    required: [true,"Hospital name is required"],
    trim: true
  },

  city: {
    type: String,
    trim: true
  },

  area: {
    type: String,
    trim: true
  },

  unitsNeeded: {
    type: Number,
    default: 1,
  },



  // User who created request
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },


  // Donor who accepted request
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },


  status: {
    type: String,
    enum: ["pending","accepted","completed"],
    default: "pending"
  },


  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },

    coordinates: {
      type: [Number],   // [lng, lat]
      required: true
    }
  }

},{ timestamps:true });



/*
Geospatial index
Required for nearby search
*/
bloodRequestSchema.index({ location: "2dsphere" });



export default mongoose.model("BloodRequest", bloodRequestSchema);