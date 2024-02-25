const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
  productname:{
    type:String,
    required:true,
    unique:true
  },
  image1:{
    type:String,
    required:true,
  },
  image2:{
    type:String,
    required:true,
  },
  image3:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  quantity:{
    type:Number,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },

})


module.exports=mongoose.model("productSchema",productSchema)
