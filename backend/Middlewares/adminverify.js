const userSchema=require('../Models/userCollections')
const isAdmin=async (req,res,next)=>{
  const admin=await userSchema.findOne({isadmin:true})
 
try {
  if(!admin)
  return res.status(401).json({message:"No Admin Found"})
  next()
} catch  {
  res.status(401).json({message:"No Admin Found"})
}
}
module.exports=isAdmin