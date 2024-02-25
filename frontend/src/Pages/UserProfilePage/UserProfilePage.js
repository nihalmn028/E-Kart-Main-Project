import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import UserProfile from '../../Components/UserProfile/UserProfile'
import Footer from '../../Components/Footer/Footer'
import axios from '../../Axios/Axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
import Error from '../../Components/Error/Error'

function UserProfilePage() {
  const [login, setLogin] = useState(false)

useEffect(() => {
 

  const token=localStorage.getItem('token')
  if(!token){
console.log("error")
  } 
  else{
    axios.get("/tokenvalidate",{headers:{Authorization:token}}).then((res)=>{
     setLogin(true)
    }).catch(()=>{
      setLogin(false)
      localStorage.removeItem('token');
    })
  }
  
}, [])
  return (
    
    <div>
      {login?
          <div>

          <NavBar login={login}/>

    {login?<UserProfile/>:<h1>Protected Route</h1>}  
      <ToastContainer/>
    </div>:<Error/>
}
    </div>

    
  )
}

export default UserProfilePage