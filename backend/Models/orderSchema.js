const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
  productid:{
    type:String,
    required:true,
  },
  orderid: {
    type: String,
    // required: true,
  },
  total:{
    type:Number,
  
  },
  paymentid: {
    type: String,
    
  },
  status: {
    type: String,
    default:"processing"
  },
  order: {
    type: Boolean,
    default:false
  },
  signature: {
    type: String,
    
  },

  userid:{
    type:String,
    required:true,
  },
  productname:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  quantity:{
    type:Number,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  number:{
    type:Number,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  city:{
    type:String,
    required:true,
  },
  pin:{
    type:Number,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },

})


module.exports=mongoose.model("orderSchema",orderSchema)
