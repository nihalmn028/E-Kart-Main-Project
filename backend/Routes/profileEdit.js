const express=require('express')
const router=express.Router()
const {profileEditControl}=require('../Controllers/profileEditControl')
router.put('/profileedit',profileEditControl)

 

module.exports=router