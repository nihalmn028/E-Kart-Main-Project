const userSchema=require('../Models/userCollections')
const bcrypt=require('bcrypt')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const userLogin=async(req,res)=>{
  
const {username,password}=req.body;
const user=await userSchema.findOne({username:username});
if(!user){
    return res.status(400).json({message:"error"})
}
const passCheck= await bcrypt.compare(password,user.password)
if (!passCheck) {
  return res.status(401).json({message:"error"})
}
if(user.isadmin==true){
  const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"7d"})
res.status(200).json({admin:true,token:token,userId:user._id})
}
else{
const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"7d"})
res.status(200).json({admin:false,token:token,userId:user._id})
}}

module.exports={userLogin}