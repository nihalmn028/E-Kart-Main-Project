const userSchema=require('../Models/userCollections')
const userProfileControl=async (req,res)=>{
const {userId}=req.body
try{
if(userId){
  const user=await userSchema.findOne({_id:userId})
  if(!user) return res.status(401).json({status:'fail',message:"User not found"});
  res.status(200).json({status:'success',message:"User found",username:user.username,fullname:user.fullname,phno:user.phno,email:user.email})
}
}
catch{
  res.status(401).json({status:'fail',message:"User not found"});
}
}
const userprofileview=async (req,res)=>{
  const {userId}=req.body
  try{
  if(userId){
    const user=await userSchema.findOne({_id:userId})
    if(!user) return res.status(401).json({status:'fail',message:"User not found"});
    res.status(200).json({status:'success',message:"User found",username:user.username,name:user.fullname,number:user.phno,email:user.email,_id:user._id})
  }
  }
  catch{
    res.status(401).json({status:'fail',message:"User not found"});
  }
  }
  const deleteuser=async (req,res)=> {
    const id=req.params.id
  
  try{
  
  const user= await userSchema.findOne({_id:id})
  if (!user)
  return res.status(401).json({message:"Error"})
  
  await userSchema.findOneAndDelete({_id:user._id})
  res.status(200).json({message:"User Deleted Successfully"})
  }
  catch(error){
     res.status(401).json({message:"error"})
    //  console.log(error);
  
  }
  }

module.exports={userProfileControl,userprofileview,deleteuser}