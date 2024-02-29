const jwt=require('jsonwebtoken');
require('dotenv').config()
function otpverify(req,res,next){
  const token=req.header('Authorization')
  if(!token) 
  return res.status(401).json({message:"error"})
try {
  const decoded=jwt.verify(token,process.env.SECRET_KEY2);
  req.user = decoded;
  next();
} catch {
  return res.status(401).json({message:"error"})
}
}
module.exports=otpverify