import React, { useEffect, useState } from 'react'
import Logoekart from '../../Components/Ekartlogonav/Logoekart'
import ProductCreation from '../../Components/ProductCreation/ProductCreation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios';
import NavBar from '../../Components/NavBar/NavBar';
import { Navigate } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';

function ProductCreationPage() {
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
         { isadmin?<div>

      {/* <Logoekart></Logoekart> */}
      <NavBar login={login} admin={isadmin}/>
     { isadmin?<ProductCreation/>:<h1>Protected Route</h1>}
      <ToastContainer/>
    </div>:<ErrorPage/>}
    </div>

  )
}

export default ProductCreationPage