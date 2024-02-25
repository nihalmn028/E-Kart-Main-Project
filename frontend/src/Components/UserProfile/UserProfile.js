import React, { useEffect, useState } from 'react'
import '../UserProfile/UserProfile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios'
import { useNavigate } from 'react-router-dom'
import Confirmation from '../Confirmation/Confirmation';
function UserProfile() {
  const [conf, setConf] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate=useNavigate()
  const [data, setData] = useState({
    fullname:"",
    username:"",
    email:"",
    phno:""
  })
  useEffect(() => {
   const user=localStorage.getItem('userId')
   setSelectedUserId(user);   

   axios.post('/userprofile',{userId:user}).then((res)=>{
setData({...data,fullname:res.data.fullname,
username:res.data.username,
email:res.data.email,
phno:res.data.phno})
   })
   .catch(()=>{
console.log("error");
   })
  }, [])
  function prfedt(){
    
    navigate('/profileedit')
  }
   
  function userdeletebtn(){
    setConf(true)
      }
      function handleDeleteConfirmation() {
        if (selectedUserId) {
          axios.delete("/userprofile/deleteuser/" + selectedUserId)
            .then((res) => {
              console.log("success");
              localStorage.removeItem('userId')
              localStorage.removeItem('token')
              navigate('/')

             
          })
            .catch(() => {
              // toast.success("error")
    
              console.log("error");
            });
        }
        setConf(false); // Hide confirmation dialog
      }
  return (
    <div>
      
  <div className={conf?'mainuserprofaf':'mainuserprof'}>
<h1>Your Profile</h1>
<div className='divprofile' style={{display:"flex",flexWrap:"wrap",marginTop:"60px"}}>
  <h5>Full Name:</h5>
  <p>{data.fullname}</p>

</div>
<div className='divprofile' style={{display:"flex",flexWrap:"wrap"}}>
  <h5>User Name:</h5>
  <p>{data.username}</p>

</div>
<div className='divprofile' style={{display:"flex",flexWrap:"wrap"}}>
  <h5>Phone Number:</h5>
  <p>{data.phno}</p>

</div>
<div className='divprofile' style={{display:"flex",flexWrap:"wrap"}}>
  <h5>Email Address:</h5>
  <p>{data.email}</p>

</div>
<div style={{display:"flex",flexWrap:'wrap',gap:"20px"}}><button className='prfbtnnn' onClick={prfedt}>Edit Profile</button>
<button className='prfbtnnn' onClick={userdeletebtn}>Delete Profile</button></div>

  </div>
  <ToastContainer/>
  <Confirmation conf={conf} onConfirm={handleDeleteConfirmation} onCancel={() => setConf(false)}/>

    </div>
  )
}

export default UserProfile