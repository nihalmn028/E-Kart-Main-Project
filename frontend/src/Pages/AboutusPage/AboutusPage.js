import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Aboutus from '../../Components/Aboutus/Aboutus'
import Footer from '../../Components/Footer/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios'
function AboutusPage() {
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
        <NavBar login={login} admin={isadmin}/>
      <Aboutus/>
      <Footer/>
<ToastContainer/>
    </div>
  )
}

export default AboutusPage