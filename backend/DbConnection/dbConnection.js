const mongoose=require('mongoose')

const dbConnection=mongoose.connect(process.env.DB_CONNECTION_STRING,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected Successfully")
  }).catch((err)=>{
    console.log(err)
  }) 
  module.exports=dbConnection