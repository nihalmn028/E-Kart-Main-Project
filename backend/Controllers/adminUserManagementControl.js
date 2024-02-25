const userschema=require('../Models/userCollections')



const getUsers=async (req,res)=>{
const users=await userschema.find({isadmin:false})
try{
if(!users) return res.status(401).json({message:"Error in Fetching"})
  res.status(200).json(users);}
catch{
  return res.status(401).json({message:"Error in Fetching"})
}
}

const deleteuser=async (req,res)=> {
  const id=req.params.id

try{

const user= await userschema.findOne({_id:id})
if (!user)
return res.status(401).json({message:"Error"})

await userschema.findOneAndDelete({_id:user._id})
res.status(200).json({message:"User Deleted Successfully"})
}
catch(error){
   res.status(401).json({message:"error"})
  //  console.log(error);

}
}



module.exports={getUsers,deleteuser}