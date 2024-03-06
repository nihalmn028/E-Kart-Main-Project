const cartSchema = require('../Models/cartSchema');
const orderSchema=require('../Models/orderSchema')
const paymentSchema=require('../Models/paymentSchema')
const productSchema=require("../Models/productSchema")
// const orderManageControl = async (req, res) => {
//   try {
//     const selectedProducts = req.body.selectedProducts;
//     const userid = req.body.userid;
//     const orderid = req.body.orderid;
//     const name = req.body.name;
//     const email = req.body.email;
//     const address = req.body.address;
//     const pin = req.body.pin;
//     const city = req.body.city;
//     const number = req.body.number;
//     const coupon=req.body.coupon

//     // Use map to create an array of promises for adding new products to order schema
//     const savePromises = selectedProducts.map(async (product) => {
//       const newOrder = {
//         productname: product.productName,
//         price: product.price,
//         quantity: product.quantity,
//         image: product.image,
//         productid: product.productid,
//         userid: userid,
//         orderid: orderid,
//         name,
//         email,
//         address,
//         pin,
//         city,
//         number,
//         coupon
//       };

//       // Use orderSchema.create to add a new document to the collection
//       await orderSchema.create(newOrder);
//     });

//     // Wait for all promises to resolve
//     await Promise.all(savePromises);

//     res.status(200).json({ message: 'Checkout successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const orderManageControl = async (req, res) => {
  try {
    const selectedProducts = req.body.selectedProducts;
    const userid = req.body.userid;
    const orderid = req.body.orderid;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const pin = req.body.pin;
    const city = req.body.city;
    const number = req.body.number;
    const coupon = req.body.coupon;
    const total = req.body.total;
// console.log(total);
    const newOrder = {
      userid,
      orderid,
      name,
      email,
      address,
      pin,
      city,
      number,
      coupon,
      total,
      products: selectedProducts.map(product => ({
        productname: product.productName,
        productid: product.productid, 
        quantity: product.quantity,
        price: product.price,
        category: product.category,
        image: product.image,
      })),
    };

    await orderSchema.create(newOrder);

    res.status(200).json({ message: 'Checkout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// const allOrdersControl=async (req,res)=>{
// try {
//   const {userid,orderid,pay}=req.body
//   if (!userid) 
//   return   res.status(401).json({ message: 'Internal server error' });
// const order1=await orderSchema.find({userid,orderid})
// if(!order1)
// return     res.status(401).json({ message: 'Internal server error' });
// const payment=await paymentSchema.findOne({razorpay_order_id:orderid})
// if(!payment)
// return     res.status(401).json({ message: 'Internal server error' });
// if (payment) {
//   await orderSchema.updateMany({ userid, orderid }, { $set: { order: true } });
  
//   order1.forEach(async order => {
//     order.products.forEach(async product => {
      
//         await productSchema.updateOne(
//           { _id: product.productid },
//           { $inc: { quantity: -(product.quantity/2) } } 
//         );
//       })
//     })
//     res.status(200).json(order1);

// }



// } catch (error) {
//      res.status(401).json({ message: 'Internal server error' });

// }
// }
const allOrdersControl = async (req, res) => {
  try {
    const { userid, orderid, pay } = req.body;
    if (!userid) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const order1 = await orderSchema.find({ userid, orderid });

    if (!order1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const payment = await paymentSchema.findOne({ razorpay_order_id: orderid });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (pay==='true') {
      
      await orderSchema.updateMany({ userid, orderid }, { $set: { order: true } });

      order1.forEach(async (order) => {
        order.products.forEach(async (product) => {
          await productSchema.updateOne(
            { _id: product.productid },
            { $inc: { quantity: -(product.quantity / 2) } }
          );
        });
      });
      order1.forEach(async (order) => {
        order.products.forEach(async (product) => {
          await cartSchema.updateMany(
            { productid: product.productid },
            { $inc: { quantity: -(product.quantity / 2) } }
          );
        });
      });

      res.status(200).json(order1);
    } else {
      // Handle case when pay is false (quantity should not increment)
      res.status(200).json(order1);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const ordersListControl=async (req,res)=>{
const {userid}=req.body;
try {
  if(!userid) 
  return     res.status(401).json({ message: 'Internal server error' });
const order=await orderSchema.find({userid,order:true})
if(!order) 
return     res.status(401).json({ message: 'Internal server error' });
res.status(200).json(order);

} catch (error) {
       res.status(401).json({ message: 'Internal server error' });

}
}
const orderViewControl=async  (req,res)=>{
const order=await orderSchema.find({order:true})
if(!order) 
return     res.status(401).json({ message: 'Internal server error' });
res.status(200).json(order);

}
const statusChangeControl= async (req,res)=> {
  const {userid,status,orderid}=req.body;
  try {
    const order=await orderSchema.findOne({userid,orderid,order:true});
  
    if (!order)
    return     res.status(401).json({ message: 'Internal server error' });
    await orderSchema.findOneAndUpdate({_id:order._id},{status:status},{new:true})
    res.status(200).json({success:true});

  } catch (error) {
     res.status(401).json({ message: 'Internal server error' });
  }
}
const cancelOrderControl=async (req,res)=>{
  const {userid,orderid}=req.body;
  try {
    const order=await orderSchema.findOne({userid,orderid,order:true});
    if (!order)
    return     res.status(401).json({ message: 'Internal server error' });
    await orderSchema.findOneAndUpdate({_id:order._id},{status:"Cancelled"},{new:true})
    res.status(200).json({success:true});

  } catch (error) {
    res.status(401).json({ message: 'Internal server error' });
  }
}
const overviewControl=async (req,res)=>{
  try {
   const order= await orderSchema.find({order:true,status:"Delivered"})
   if (!order)
   return     res.status(401).json({ message: 'Internal server error' });
   res.status(200).json(order);

  } catch (error) {
    res.status(401).json({ message: 'Internal server error' });

  }
}
const deleteorderControl=async (req,res)=> {
  const id=req.params.id

try{

const order= await orderSchema.findOne({orderid:id})
if (!order)
return res.status(401).json({message:"Error"})

await orderSchema.findOneAndDelete({_id:order._id})
res.status(200).json({message:"User Deleted Successfully"})
}
catch(error){
   res.status(401).json({message:"error"})
  //  console.log(error);

}
}
module.exports = { orderManageControl,overviewControl,deleteorderControl,cancelOrderControl ,allOrdersControl,ordersListControl,orderViewControl,statusChangeControl};
