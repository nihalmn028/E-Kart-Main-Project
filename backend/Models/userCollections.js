const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  fullname:{
    type:String,
    required:true,
  },
  phno:{
    type:Number,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  type:{
type:String
  },
  otp:{
    type:Number
  },
  // reset:{
  //   type:Boolean
  // },
  isadmin:{
    type:Boolean,
    default:false
  }
})


module.exports=mongoose.model("userSchema",userSchema)