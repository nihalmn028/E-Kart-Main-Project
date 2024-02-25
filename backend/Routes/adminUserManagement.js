const express=require('express')
const router=express.Router()
 const {getUsers,deleteuser}=require('../Controllers/adminUserManagementControl')

router.get('/getusers',getUsers)
router.delete('/deleteuser/:id',deleteuser)



module.exports=router