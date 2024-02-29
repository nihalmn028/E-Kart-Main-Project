const cartSchema=require('../Models/cartSchema')
const checkoutschema = require('../Models/checkoutschema')
const productSchema=require('../Models/productSchema')

const addtoCart=async (req,res)=>{

    const {userId,spid,quantity}=req.body
    try {
const cart=await cartSchema.findOne({userid:userId,productid:spid})
const products=await productSchema.findOne({_id:spid})
if(!products)
  return res.status(401).json({message:'error'})
if(cart){
await cartSchema.findOneAndUpdate({_id:cart._id},{userid:userId,productid:spid,productname:products.productname,price:products.price,quantity:products.quantity,image:products.image1,selectedquantity:quantity},{new:true})

res.status(200).json({message:'exist'})
}


else{
  await cartSchema.create({userid:userId,productid:spid,productname:products.productname,price:products.price,quantity:products.quantity,image:products.image1,selectedquantity:quantity})

res.status(200).json({message:'success'})}



  


  
//  res.status(200).json({message:'success'})
} catch (error) {
     res.status(401).json({message:'error'})
     console.log(error);

  }

  
}

const allCarts=async (req,res)=>{
  try {
    const userId=req.params.id
    const cart=await cartSchema.find({userid:userId})
    // const cart1=cart.map((data)=>data.productid)
    // const products = await productSchema.find({ _id: { $in: cart1 } });
    if(!cart){  
      return res.status(404).json({message:"no carts"});
    }
// console.log(products);
        res.status(200).json(cart);
    // console.log(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"server error"})

 
    
  }

}

const checkoutadd = async (req, res) => {
  try {
    const selectedProducts = req.body.selectedProducts;
    const userid = req.body.userid;

    // Use map to create an array of promises for updating or adding products to checkout schema
    const savePromises = selectedProducts.map(async (product) => {
      const filter = {
        productid: product.productid,
        userid: userid
      };

      const update = {
        productname: product.productName,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        productid: product.productid,
        userid: userid
      };

      // Use findOneAndUpdate with upsert option to update or insert based on the filter
      await checkoutschema.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true, // Return the updated document
        useFindAndModify: false // To use native findOneAndUpdate instead of deprecated findAndModify
      });
    });

    // Wait for all promises to resolve
    await Promise.all(savePromises);

    res.status(200).json({ message: 'Checkout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteCart=async (req,res)=> {
  const {userid,productid}=req.body

try{

const product= await cartSchema.findOne({userid,productid})
const checkout= await checkoutschema.findOne({userid,productid})

if (!product)
return res.status(401).json({message:"Error"})

await cartSchema.findOneAndDelete({_id:product._id})
if(checkout)
await checkoutschema.findOneAndDelete({_id:checkout._id})

res.status(200).json({message:"Product Deleted Successfully"})
}
catch(error){
   res.status(401).json({message:"error"})
  //  console.log(error);

}
}
const checkoutView=async (req,res)=> {
  try{
    const id=req.params.id
 const checkout=await checkoutschema.find({userid:id})
 if(!checkout)
return res.status(401).json({message:"error"})

  res.status(200).json(checkout)
 
}
catch(error){
   res.status(401).json({message:"error"})

}
}
module.exports={addtoCart,allCarts,deleteCart,checkoutadd,checkoutView}