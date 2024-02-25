const express=require('express')
const router=express.Router()
const {userProfileControl,userprofileview,deleteuser}=require('../Controllers/userprofilecontrol')
router.post('/',userProfileControl)
router.delete('/deleteuser/:id',deleteuser)
router.post('/getuser',userProfileControl)
router.post('/view',userprofileview)







module.exports=router