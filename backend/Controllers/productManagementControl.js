const productSchema=require('../Models/productSchema')



const getProducts=async (req,res)=>{
try{
  const products=await productSchema.find()
if(!products) return res.status(401).json({message:"Error in Fetching"})
  res.status(200).json(products);}
catch{
  return res.status(401).json({message:"Error in Fetching"})
}
}

const deleteProduct=async (req,res)=> {
  const id=req.params.id

try{

const product= await productSchema.findOne({_id:id})
if (!product)
return res.status(401).json({message:"Error"})

await productSchema.findOneAndDelete({_id:product._id})
res.status(200).json({message:"Product Deleted Successfully"})
}
catch(error){
   res.status(401).json({message:"error"})
  //  console.log(error);

}
}
const updateProduct=async (req,res)=>{
  const image1=req.files[0].filename
  const image2=req.files[1].filename
  
  const image3=req.files[2].filename
  const productname=req.body.productname
  const price=req.body.price
  const description=req.body.description
  const quantity=req.body.quantity
  const category=req.body.category
  const productid=req.body.productid

  const product=await productSchema.findOne({_id:productid})
  try{ 
  if(!product){
  
  return res.status(401).json({message:"Error"})
  }
await productSchema.findOneAndUpdate({_id:product._id},{productname,image1,image2,image3,description,price,quantity,category},{new:true})
res.status(200).json({message:"Product Updated Successfully"}) 

  } catch(err){
    console.log(err);
     res.status(401).json({message:"Error"})
  }
}

const allProducts=async(req,res)=>{
  try{
    const product=await productSchema.find()
    if(!product)
    return res.status(401).json({message:"Error"})
  res.status(200).json(product)
  }catch(err){
    res.status(401).json({message:"Error"})
  }  
  
}
const singleProduct=async (req,res)=>{
  const {spid}=req.body
  
  const product= await productSchema.findOne({_id:spid})
  try{
  if (!product) 
    return res.status(401).json({message:"Error"})
    res.status(200).json(product)
  }
  catch{
    return res.status(401).json({message:"Error"})

  }
}
const viewProduct=async (req,res)=>{
  const {productid}=req.body
  
  const product= await productSchema.findOne({_id:productid})
  try{
  if (!product) 
    return res.status(401).json({message:"Error"})
    res.status(200).json(product)
  }
  catch{
    return res.status(401).json({message:"Error"})

  }
}
const searchProduct= async (req,res)=>{

  try{
    const {keyword}=req.params
    const result =await  productSchema.find({
      $or:[
        {productname:{$regex:keyword,$options:"i"}}
      ]
      })
      if(result.length===0){
        return res.status(401).json({message:"no found"})
      }
      res.status(200).json(result)
      // console.log(result);

} catch (error) {
  console.log(error);
  return res.status(401).json({message:"Error"})
}
}

module.exports={getProducts,deleteProduct,updateProduct,allProducts,singleProduct,viewProduct,searchProduct}