const express=require('express')
const upload=require('../Middlewares/multer')

const router=express.Router()
 const {getProducts,deleteProduct,getProductavailable,updateProduct,allProducts,singleProduct,viewProduct,searchProduct}=require('../Controllers/productManagementControl')
 

router.get('/getproducts',getProducts)
router.get('/getproductavailable',getProductavailable)

router.delete('/deleteproduct/:id',deleteProduct)
router.put('/updateproduct',upload.array('file',3),updateProduct)
router.get('/allproducts',allProducts)
router.post('/singleproduct',singleProduct)
router.post('/view',viewProduct)
router.post('/search',searchProduct)






module.exports=router 