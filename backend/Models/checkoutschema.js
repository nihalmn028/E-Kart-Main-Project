const mongoose=require('mongoose')
const checkoutschema=mongoose.Schema({
  userid:{
    type:String,
    required:true,
  },
  total:{
    type:Number,

  },
  productid:{
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


module.exports=mongoose.model("checkoutschema",checkoutschema)
