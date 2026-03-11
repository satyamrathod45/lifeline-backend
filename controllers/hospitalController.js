import Hospital from "../models/Hospital.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const registerHospital = async(req,res)=>{

 try{

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
  } = req.body


  const existing = await Hospital.findOne({phone})

  if(existing){
    return res.status(400).json({
      success:false,
      message:"Hospital already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password,10)

  const hospital = new Hospital({

    hospitalName,
    phone,
    email,
    password:hashedPassword,
    licenseNumber,
    city,
    area,
    address,

    location:{
      type:"Point",
      coordinates
    }

  })


  await hospital.save()


  const token = jwt.sign(
    {id:hospital._id,role:"hospital"},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
  )


  const data = hospital.toObject()
  delete data.password


  res.status(201).json({
    success:true,
    message:"Hospital registered successfully",
    token,
    hospital:data
  })

 }catch(error){

  res.status(500).json({
    success:false,
    message:"Server error",
    error:error.message
  })

 }

}

export const loginHospital = async(req,res)=>{

 try{

  const {phone,password} = req.body

  const hospital = await Hospital.findOne({phone})

  if(!hospital){
    return res.status(404).json({
      success:false,
      message:"Hospital not found"
    })
  }

  const match = await bcrypt.compare(password,hospital.password)

  if(!match){
    return res.status(401).json({
      success:false,
      message:"Invalid password"
    })
  }

  const token = jwt.sign(
    {id:hospital._id,role:"hospital"},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
  )

  res.json({
    success:true,
    token,
    hospital:{
      id:hospital._id,
      hospitalName:hospital.hospitalName
    }
  })

 }catch(error){

  res.status(500).json({
    success:false,
    message:"Server error"
  })

 }

}