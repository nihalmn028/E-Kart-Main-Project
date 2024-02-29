import React, { useEffect, useState } from 'react'
import Otp from '../../Components/Otp/Otp'
import axios from '../../Axios/Axios'
import Logoekart from '../../Components/Ekartlogonav/Logoekart'
import ErrorPage from '../ErrorPage/ErrorPage'
function OtpPage() {
  const [email, setEmail] = useState(false)
  useEffect(() => {
    const token=localStorage.getItem('otptoken')
 
    if(!token){
  console.log("error")
    } 
    else{
      axios.get("/otpvalidate",{headers:{Authorization:token}}).then((res)=>{
       setEmail(true)
       
      }).catch(()=>{
  
        setEmail(false)
        localStorage.removeItem('otptoken');
      })
    }
    
  }, [])
  
  
 
  return (
    <div>
   {email? <div>

      <Logoekart/>
      <Otp/>
    </div>:<ErrorPage/>}
    </div>

  )
}

export default OtpPage