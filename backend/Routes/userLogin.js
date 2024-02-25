const express=require('express')
const router=express.Router()
const {userLogin} =require('../Controllers/userLoginController')
router.post('/userlogin',userLogin)



module.exports=router