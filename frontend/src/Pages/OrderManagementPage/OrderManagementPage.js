import React, { useEffect, useState } from 'react'
import OrderManagement from '../../Components/OrderManagement/OrderManagement'
import axios from '../../Axios/Axios'
import NavBar from '../../Components/NavBar/NavBar'
import ErrorPage from '../ErrorPage/ErrorPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OrderManagementPage() {
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
               {isadmin?<div>

<NavBar login={login} admin={isadmin}/>
{isadmin?<OrderManagement/>:<h1>Protected Route</h1>
}
<ToastContainer/>
</div>:<ErrorPage/>}
    </div>
  )
}

export default OrderManagementPage