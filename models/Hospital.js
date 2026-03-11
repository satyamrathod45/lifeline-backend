import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({

  hospitalName:{
    type:String,
    required:true,
    trim:true
  },

  phone:{
    type:String,
    required:true,
    unique:true
  },

  email:{
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  licenseNumber:{
    type:String,
    required:true
  },

  city:String,
  area:String,

  address:String,

  location:{
    type:{
      type:String,
      enum:["Point"],
      default:"Point"
    },
    coordinates:{
      type:[Number],
      index:"2dsphere"
    }
  },

  verified:{
    type:Boolean,
    default:false
  }

},{timestamps:true})

hospitalSchema.index({location:"2dsphere"})

export default mongoose.model("Hospital",hospitalSchema)