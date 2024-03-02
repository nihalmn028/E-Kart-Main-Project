import React, { useEffect, useState } from 'react'
import PlaceOrder from '../../Components/PlaceOrder/PlaceOrder'
import Footer from '../../Components/Footer/Footer'
import ErrorPage from '../ErrorPage/ErrorPage'
import NavBar from '../../Components/NavBar/NavBar'
import axios from '../../Axios/Axios'
import { useNavigate } from 'react-router-dom'
function PlaceOrderPage() {
  const navigate=useNavigate()
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

<NavBar  login={login} admin={isadmin}/>
{login?  <PlaceOrder/>:<h1>Protected Route</h1>}
<Footer/>
</div>:<ErrorPage/>}
    </div>
  )
}

export default PlaceOrderPage