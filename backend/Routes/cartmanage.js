const express=require('express')
// const multer = require('multer');
// const path=require('path')
const router=express.Router()
 const {addtoCart,couponControl,singleCheckoutControl,allCarts,deleteCart,checkoutadd,checkoutView}=require('../Controllers/cartmanagecontrol')
//  const storage = multer.diskStorage({
//   destination: (req, file, cb)=> {
//     cb(null, 'public/images'); // Save uploaded files to the 'uploads' directory
//   },
//   filename:  (req, file, cb)=> {
//     cb(null, file.fieldname + "_" + Date.now()  + path.extname(file.originalname)) // Use a unique filename
//   }
// });
 
// const upload = multer({ storage: storage }); 


router.post('/addtocart',addtoCart)
router.post('/singlecheckout',singleCheckoutControl)

router.get('/allcarts/:id',allCarts)
router.post('/deletecart',deleteCart)
router.post('/checkoutadd',checkoutadd)
router.post('/coupon',couponControl)

router.get('/checkoutview/:id',checkoutView)








module.exports=router