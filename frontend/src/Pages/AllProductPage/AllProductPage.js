import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import AllProducts from '../../Components/All Products/AllProducts'
import Footer from '../../Components/Footer/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios'
function AllProductPage() {
  const [login, setLogin] = useState(false)
  const [isadmin, setIsAdmin] = useState(false)

   
  
    const admin=localStorage.getItem('admin')
  useEffect(() => {
   
  
    const token=localStorage.getItem('token')
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
      <AllProducts/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default AllProductPage