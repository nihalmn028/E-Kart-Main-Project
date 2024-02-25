const productSchema=require('../Models/productSchema')


const ProductCreation=async(req,res)=>{
// const {productname,description,price,quantity,category}=req.body;

const image1=req.files[0].filename
const image2=req.files[1].filename

const image3=req.files[2].filename
const productname=req.body.productname
const price=req.body.price
const description=req.body.description
const quantity=req.body.quantity
const category=req.body.category
 
try {
  const productexist= await productSchema.findOne({productname})

    if (productexist) 
      return res.status(401).json({ message:"product already exist" });
       
 
      
  await productSchema.create({productname,description,price,quantity,category,image1,image2,image3})
  res.status(200).json({message:"success"})
} catch (error) {
  res.status(401).json({message:"failed"})

}
}

module.exports={ProductCreation}