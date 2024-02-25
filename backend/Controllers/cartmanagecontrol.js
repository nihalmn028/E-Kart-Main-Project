const cartSchema=require('../Models/cartSchema')
const productSchema=require('../Models/productSchema')

const addtoCart=async (req,res)=>{
  try {
    const {userId,spid}=req.body
const cart=await cartSchema.findOne({userid:userId,productid:spid})
if(cart){
  return res.status(200).json({message:'exist'})

}
const products=await productSchema.findOne({_id:spid})
if(!products){
  return res.status(401).json({message:'error'})

}

await cartSchema.create({userid:userId,productid:spid,productname:products.productname,price:products.price,quantity:products.quantity,image:products.image1})
 res.status(200).json({message:'success'})
  } catch (error) {
     res.status(401).json({message:'error'})
     console.log(error);

  }


}
const allCarts=async (req,res)=>{
  try {
    const userId=req.params.id
    const cart=await cartSchema.find({userid:userId})
    if(!cart){  
      return res.status(404).json({message:"no carts"});
    }

        res.status(200).json(cart);
    // console.log(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"server error"})

 
    
  }

}
const deleteCart=async (req,res)=> {
  const {userid,productid}=req.body

try{

const product= await cartSchema.findOne({userid,productid})
if (!product)
return res.status(401).json({message:"Error"})

await cartSchema.findOneAndDelete({_id:product._id})
res.status(200).json({message:"Product Deleted Successfully"})
}
catch(error){
   res.status(401).json({message:"error"})
  //  console.log(error);

}
}
module.exports={addtoCart,allCarts,deleteCart}