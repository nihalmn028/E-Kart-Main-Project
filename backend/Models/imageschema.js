const mongoose=require('mongoose')
const imageschema=mongoose.Schema({

  image:{
    type:String,
    required:true,
  },
  
})


module.exports=mongoose.model("imageschema",imageschema)
