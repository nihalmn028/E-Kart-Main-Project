const express=require('express')
const multer = require('multer');
const path=require('path')
const router=express.Router()
 const {ProductCreation}=require('../Controllers/addProductControl')
 const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'public/images'); // Save uploaded files to the 'uploads' directory
  },
  filename:  (req, file, cb)=> {
    cb(null, file.fieldname + "_" + Date.now()  + path.extname(file.originalname)) // Use a unique filename
  }
});
 
const upload = multer({ storage: storage }); 
router.post('/addproduct',upload.array('file',3),ProductCreation)



module.exports=router