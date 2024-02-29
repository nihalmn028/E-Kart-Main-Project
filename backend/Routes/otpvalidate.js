const express=require('express')
const router=express.Router()
const otpverify=require('../Middlewares/otpverify')
router.get('/otpvalidate',otpverify,(req,res)=>{
  res.status(200).json({message:"success"})
})


module.exports=router