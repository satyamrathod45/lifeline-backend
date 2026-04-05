import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req,res,next)=>{

 try{

  const token = req.cookies.token

  if(!token){
   return res.status(401).json({
    success:false,
    message:"Not authorized"
   })
  }

  const decoded = jwt.verify(token,process.env.JWT_SECRET)

  const user = await User.findById(decoded.id).select("-password")

  if(!user){
   return res.status(401).json({
    success:false,
    message:"User not found"
   })
  }

  if (user.isBanned) {
  return res.status(403).json({ message: "You are banned by admin" });
}
  req.user = user   // IMPORTANT

  next()

 }catch(error){

  res.status(401).json({
   success:false,
   message:"Invalid token"
  })

 }

}

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