const express=require('express')
const router=express.Router()
const tokenVerification=require('../Middlewares/tokenVerifcation')
router.get('/tokenvalidate',tokenVerification,(req,res)=>{
  res.status(200).json({message:"success"})
})


module.exports=router