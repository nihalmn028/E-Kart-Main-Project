const mongoose=require('mongoose')
const cartSchema=mongoose.Schema({
  productid:{
    type:String,
    
    required:true,
  },
  selectedquantity:{
    type:Number,
    required:true,
  },
  category:{
    type:String
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
 

})


module.exports=mongoose.model("cartSchema",cartSchema)
