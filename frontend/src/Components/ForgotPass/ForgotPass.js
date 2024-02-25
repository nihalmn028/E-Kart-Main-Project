import React, { useRef, useState } from 'react'
import '../ForgotPass/ForgotPass.css'
// import LogoForForgt from '../ForgotPass/ForgotsectionImages/LOGO  ekart.png'
import { useNavigate } from 'react-router-dom'

import axios from '../../Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ForgotPass() {
  const navigate=useNavigate()
const ref=useRef()
  const [input, setInput] = useState("")
  const [data, setData] = useState("")

  function handlechange(event){
setInput(event.target.value)
  }
  function handleclk(){
    if(input===""){
    setData("Enter the email")
    ref.current.style.border= "3px solid red";

    }
    else{
      setData("")
      setInput("")
      ref.current.style.border= "2px solid orange";
      axios.post("/forgotpass/emailverify",{email:input}).then((res)=>{
        if(input==res.data.fgemail){
        localStorage.setItem('fgemail',res.data.fgemail)
        toast.success('otp send successfully');
        setTimeout(() => {
          navigate('/otp')

        }, 1200);}
        else{
          toast.error('Email is not registered');

        }
      }).catch(()=>{
        toast.error('Email is not registered');
      })
    }
  }
  return (
    <div>
      <div  className="forgot-pass-main">
<div className='forgorsectioncontainerr'>
{/* <img src={LogoForForgt} alt="" className='logoforgot'/> */}
<h1  className='logoforgot'>Reset Password</h1>
<p className='forgotdes'>Enter the email address associated with your account <br />and we'll send you a link to reset your password.</p>
<label htmlFor="">Email</label>
<input ref={ref} type="email" name='email' value={input} onChange={handlechange} placeholder='Enter your Email Address'/>
<p  style={{color:"red"}}>{data}</p>

<button onClick={handleclk}>Continue</button>
<p className='lastpforgot' onClick={()=>navigate('/signup')}>Dont have an account? <span>Sign Up</span></p>


</div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ForgotPass