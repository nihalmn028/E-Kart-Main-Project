const express=require('express')
const router=express.Router()
 const {emailVerify,otpverify,newPass}=require('../Controllers/forgotPassController')
router.post('/emailverify',emailVerify)
router.post('/otpverify',otpverify)
router.post('/newpass',newPass)


module.exports=router