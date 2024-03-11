require('dotenv')
const crypto=require('crypto')
const instance=require('../PaymentInstance/paymentInstance')
const paymentSchema=require('../Models/paymentSchema')
const orderManageControl=require('./orderManageControl')
const paymentControl=async (req,res)=>{
  const {amount}=req.body
const options={
  amount:amount,
  currency:"INR",
} 
const order=await instance.orders.create(options)
res.status(200).json(order)
} 
const paymentVerify=async (req,res)=>{
  
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature} =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await paymentSchema.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // res.status(200).json({success:true})

    res.redirect(
      "http://localhost:3000/orderplace"
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
  
  }


 const getKeyControl= (req, res) =>{
  res.status(200).json({ key: process.env.RAZOR_API_KEY })
}
module.exports={paymentControl,paymentVerify,getKeyControl}