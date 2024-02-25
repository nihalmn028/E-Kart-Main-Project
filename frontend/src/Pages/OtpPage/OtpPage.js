import React, { useEffect, useState } from 'react'
import Otp from '../../Components/Otp/Otp'
import Logoekart from '../../Components/Ekartlogonav/Logoekart'
import ErrorPage from '../ErrorPage/ErrorPage'

function OtpPage() {
  const [email, setEmail] = useState("")
  useEffect(() => {
   
    const email1=localStorage.getItem('fgemail')
    setEmail(email1)
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