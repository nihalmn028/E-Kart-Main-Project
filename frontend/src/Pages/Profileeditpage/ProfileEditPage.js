import React, { useEffect, useState } from 'react'
import ProfileEdit from '../../Components/ProfileEdit/ProfileEdit'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import axios from '../../Axios/Axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
import ErrorPage from '../ErrorPage/ErrorPage'
function ProfileEditPage() {
  const [login, setLogin] = useState(false)
const [isadmin, setIsAdmin] = useState(false)

useEffect(() => {
 

  const token=localStorage.getItem('token')
  const admin=localStorage.getItem('admin')
  if(!token){
console.log("error")
  } 
  else{
    axios.get("/tokenvalidate",{headers:{Authorization:token}}).then((res)=>{
     setLogin(true)
     setIsAdmin(admin)
    }).catch(()=>{
      setLogin(false)
      localStorage.removeItem('token');
    })
  }
  
}, [])
  return (
    <div>
          {login?<div>

      
 <NavBar login={login} admin={isadmin}/>    
 {login? <ProfileEdit/>:<h1>Protected Route</h1>
}  
      <ToastContainer/>
    </div>:<ErrorPage/>}
        </div>

  )
}

export default ProfileEditPage