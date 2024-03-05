const express=require('express')
const router=express.Router()
const upload=require('../Middlewares/multer')
const {ProductCreation}=require('../Controllers/addProductControl')

router.post('/addproduct',upload.array('file',3),ProductCreation)



module.exports=router