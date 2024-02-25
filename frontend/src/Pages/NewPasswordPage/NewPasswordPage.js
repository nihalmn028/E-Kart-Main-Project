import React, { useEffect, useState } from 'react'
import NewPassword from '../../Components/NewPassword/NewPassword'

import Logoekart from '../../Components/Ekartlogonav/Logoekart'
import ErrorPage from '../ErrorPage/ErrorPage'

function NewPasswordPage() {
  const [email, setEmail] = useState("")
  useEffect(() => {
   
    const email1=localStorage.getItem('fgemail')
    setEmail(email1)
  }, [])
  return (
    <div>
       {email?<div>
      <Logoekart/>
      <NewPassword/>
    </div>:<ErrorPage/>}
        </div>

  )
}

export default NewPasswordPage