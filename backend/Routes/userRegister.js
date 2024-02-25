const express=require('express')
const router=express.Router()
const {userRegister} =require('../Controllers/userRegisterController')
router.post('/userregister',userRegister)



module.exports=router