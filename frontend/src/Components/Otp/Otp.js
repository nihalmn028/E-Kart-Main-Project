import React, { useRef, useState } from 'react'
import '../Otp/Otp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios';
import { useNavigate } from 'react-router-dom';
function Otp() {
  const navigate=useNavigate()
  const ref =useRef()
  const [input, setInput] = useState("")
  const [data, setData] = useState("")
  function handliclk(){
    if(input===""){
      setData("Enter the otp")
      ref.current.style.border= "3px solid red";
    }
    else{
      setData("")
      setInput("")
      ref.current.style.border= "2px solid orange";
      const fgemail=localStorage.getItem('fgemail')
      
      axios.post("/forgotpass/otpverify",{otp:input, fgemail:fgemail}).then((res)=>{
        if(res.data.fgemail==fgemail){
      

        toast.success("OTP Verified Successfully")
        setTimeout(() => {
          navigate('/newpass')

        }, 1200);
      localStorage.setItem('fgemail',res.data.fgemail)
      }
      else{
        toast.error("OTP failed")

      }
      }).catch(()=>{
        toast.error("OTP failed")
      })
    
    }
  }
  
  return (
    <div>
         <div  className="otpforgot-pass-main">
<div className="otpforgorsectioncontainer">
{/* <img src={LogoForForgt} alt="" className='logoforgot'/> */}
<h1  className="otplogoforgot">OTP Verification</h1>
<p className="otpforgotdes">Enter the OTP that has been send to your Email.</p>
<label htmlFor="">OTP</label>
<input ref={ref} type="number" value={input} onChange={(event)=>setInput(event.target.value)} placeholder='Enter your OTP'/>
<p style={{color:"red"}}>{data}</p>

<button onClick={handliclk}>Continue</button>

</div>
      </div>
      <ToastContainer/>

    </div>
  )
}

export default Otp