const express=require('express')
const multer = require('multer');
const path=require('path')
const router=express.Router()
 const {getProducts,deleteProduct,getProductavailable,updateProduct,allProducts,singleProduct,viewProduct,searchProduct}=require('../Controllers/productManagementControl')
 const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'public/images'); // Save uploaded files to the 'uploads' directory
  },
  filename:  (req, file, cb)=> {
    cb(null, file.fieldname + "_" + Date.now()  + path.extname(file.originalname)) // Use a unique filename
  }
});
 
const upload = multer({ storage: storage }); 

router.get('/getproducts',getProducts)
router.get('/getproductavailable',getProductavailable)

router.delete('/deleteproduct/:id',deleteProduct)
router.put('/updateproduct',upload.array('file',3),updateProduct)
router.get('/allproducts',allProducts)
router.post('/singleproduct',singleProduct)
router.post('/view',viewProduct)
router.get('/search/:keyword',searchProduct)






module.exports=router 