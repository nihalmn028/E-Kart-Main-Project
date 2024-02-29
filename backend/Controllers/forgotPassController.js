const userschema=require('../Models/userCollections')
const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')

require('dotenv')
const bcrypt=require('bcrypt')
const emailVerify=async(req,res)=>{
const {email}=req.body;
const user=await userschema.findOne({email})
if(!user)
 return res.status(401).json({message:"User not found"})
 const otp=Math.floor(1000+ Math.random()*9000);
  await userschema.findByIdAndUpdate({_id:user._id},{otp},{new:true})
  const token=jwt.sign({emailId:user.email},process.env.SECRET_KEY2,{expiresIn:"7d"})
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: "odcg twju lmnw qrgw"
    }
  });
  
  // Email content
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: 'OTP FOR RESET PASSWORD', 
    html: `<div><p>Your otp for reset password is </p><h1> ${otp}</h1></div>`
  };
  
  // Send email
  await transporter.sendMail(mailOptions, () => {
   
    console.log('Email sent:');
   
   
  
  });
  res.status(200).json({message:"User found",token:token,fgemail:user.email});

}
const otpverify=async (req,res)=>{
  const{otp,fgemail}=req.body
  const user=await userschema.findOne({otp,email:fgemail});
  if(!user)
  return res.status(401).json({message:'Invalid OTP'})
await userschema.findByIdAndUpdate({_id:user._id},{otp:""},{new:true})
return res.status(200).json({message:'Valid OTP',fgemail:user.email})
}
const newPass=async (req,res)=>{
  const {newpass,fgemail}=req.body

const hashpass=await bcrypt.hash(newpass,10)
  const user=await userschema.findOne({email:fgemail});
  
  if(!user)
  return res.status(401).json({message:'Invalid OTP'})
await userschema.findByIdAndUpdate({_id:user._id},{password:hashpass},{new:true})
// await userschema.findByIdAndUpdate({_id:user._id},{reset:false},{new:true})

return res.status(200).json({message:'password changed',fgemail:user.email})
}

module.exports={emailVerify,otpverify,newPass}