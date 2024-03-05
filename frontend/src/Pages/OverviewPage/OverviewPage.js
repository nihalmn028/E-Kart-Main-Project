import React, { useEffect, useState } from 'react'
import axios from '../../Axios/Axios'
import Overview from '../../Components/Overview/Overview'
import NavBar from '../../Components/NavBar/NavBar'
import ErrorPage from '../ErrorPage/ErrorPage'
function OverviewPage() {
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
{isadmin?<Overview/>:<h1>Protected Route</h1>
}
</div>:<ErrorPage/>}
    </div>
  )
}

export default OverviewPage