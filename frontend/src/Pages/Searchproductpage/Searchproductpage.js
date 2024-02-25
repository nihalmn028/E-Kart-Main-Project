import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Searchproduct from '../../Components/Searchproduct/Searchproduct'
import Footer from '../../Components/Footer/Footer'
import axios from '../../Axios/Axios'
function Searchproductpage() {

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
      <NavBar login={login} admin={isadmin} />
      <Searchproduct/>
      <Footer/>
    </div>
  )
}

export default Searchproductpage