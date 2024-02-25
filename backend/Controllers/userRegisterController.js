const userSchema=require('../Models/userCollections')
const bcrypt=require('bcrypt')
require('dotenv')

const userRegister=async(req,res)=>{
const {username,password,email,number,name}=req.body;
if(username===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD && email===process.env.ADMIN_EMAIL){
var isadmin=true
}
  const hashedPassword=await  bcrypt.hash(password,10)
try {
  const userExist= await userSchema.findOne({ username: username })
  const emailexist= await userSchema.findOne({ email: email })

    if (userExist) 
      return res.status(401).json({ message:"User already exist" });
      if(emailexist)
        return res.status(401).json({ message:"User already exist" });

      
  await userSchema.create({username,password:hashedPassword,email,isadmin,phno:number,fullname:name})
  res.status(200).json({message:"success"})
} catch (error) {
  res.status(401).json({message:"failed"})

}
}

module.exports={userRegister}