import React, { useEffect, useState } from 'react'
import Logoekart from '../../Components/Ekartlogonav/Logoekart'
import UserManagement from '../../Components/UserManagement/UserManagement'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../Components/NavBar/NavBar';
import axios from '../../Axios/Axios'
import { Navigate } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';

function UsermanagementPage() {
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
      {isadmin?
          <div>
           <NavBar login={login} admin={isadmin}/>

           {isadmin?<UserManagement/>:<h1>Protected Route</h1> }  
              <ToastContainer/>
    </div>:<ErrorPage/>}
     </div>
  )
}

export default UsermanagementPage