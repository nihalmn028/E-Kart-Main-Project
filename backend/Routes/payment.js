const express=require('express')
const router=express.Router()
const {paymentControl,paymentVerify,getKeyControl}=require('../Controllers/paymentControl')
router.post('/payment',paymentControl)
router.post('/paymentverify',paymentVerify)
router.get('/getkey',getKeyControl)

module.exports=router