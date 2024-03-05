// const mongoose=require('mongoose')
// const orderSchema=mongoose.Schema({
//   productid:{
//     type:String,
//     required:true,
//   },
//   orderid: {
//     type: String,
//     // required: true,
//   },
//   coupon:{
//     type:Boolean,
//     default:false
  
//   },
//   paymentid: {
//     type: String,
    
//   },
//   status: {
//     type: String,
//     default:"Processing"
//   },
//   order: {
//     type: Boolean,
//     default:false
//   },
//   signature: {
//     type: String,
    
//   },

//   userid:{
//     type:String,
//     required:true,
//   },
//   productname:{
//     type:String,
//     required:true,
//   },
//   price:{
//     type:Number,
//     required:true,
//   },
//   image:{
//     type:String,
//     required:true,
//   },
//   quantity:{
//     type:Number,
//     required:true,
//   },
//   name:{
//     type:String,
//     required:true,
//   },
//   number:{
//     type:Number,
//     required:true,
//   },
//   address:{
//     type:String,
//     required:true,
//   },
//   city:{
//     type:String,
//     required:true,
//   },
//   pin:{
//     type:Number,
//     required:true,
//   },
//   email:{
//     type:String,
//     required:true,
//   },

// })


// module.exports=mongoose.model("orderSchema",orderSchema)
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
    order: {
       type: Boolean,
        default:false,
    },
       status: {
     type: String,
    default:"Processing"
 },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
   
  },
  coupon: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      productname: {
        type: String,
        required: true,
      },
      productid: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category:{
        type:String
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("orderSchema", orderSchema);