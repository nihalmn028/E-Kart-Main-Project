const userSchema=require('../Models/userCollections')



const profileEditControl=async (req,res)=>{
  const{username,email,number,name,userId}=req.body
  try {
const user=await userSchema.findOne({_id:userId})
if(!user){
return res.status(401).json({message:"error"})}
await userSchema.findOneAndUpdate({_id:user._id},{username,email,phno:number,fullname:name},{new:true})
  res.status(200).json({message:"success"})  
}
catch {

    res.status(401).json({message:"error"})
  }
}








module.exports={profileEditControl}