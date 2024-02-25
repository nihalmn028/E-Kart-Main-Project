import React, { useRef, useState } from 'react'
import '../NewPassword/NewPassword.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios';
import { useNavigate } from 'react-router-dom';
// import LogoForNewPass from '../NewPassword/NewPasswordImages/LOGO  ekart.png'

function NewPassword() {
  const ref=useRef()
  const ref2=useRef()

  const navigate=useNavigate()
  const [input, setInput] = useState({
    password:"",
    confirmpass:""
  })
  const [data, setData] = useState({
    password:"",
    confirmpass:""
  })
  function handlechange(event){
const {name,value}= event.target;
setInput({...input,[name]: value})
  }
  function handleclk(e){
    e.preventDefault();

if(input.password===""){
    setData({...data,password:"Enter the password"})
  ref.current.style.border= "3px solid red";
  }
    else if(input.confirmpass===""){
      setData({...data,confirmpass:"Enter the confirm password"})
      ref2.current.style.border= "3px solid red";
    }
    else if(input.password!==input.confirmpass){
      toast.error("Password Does Not Match")
      setInput({...input,password:"",confirmpass:""});
    setData({...data,password:"",confirmpass:""})
    ref.current.style.border= "2px solid orange";
    ref2.current.style.border= "2px solid orange";
    }
   else{
   
    setInput({...input,password:"",confirmpass:""});
    setData({...data,password:"",confirmpass:""})
    ref.current.style.border= "2px solid orange";
    ref2.current.style.border= "2px solid orange";
    const fgemail=localStorage.getItem('fgemail')
  axios.post("/forgotpass/newpass",{newpass:input.confirmpass,fgemail:fgemail}).then((res)=>{
    if(res.data.fgemail==fgemail){
    toast.success("Password Changed Successfully");
    localStorage.removeItem('fgemail');

    localStorage.removeItem('token');
     setTimeout(() => {
      navigate('/login')

     },1200)}
     else{
      toast.error("Password Changing Failed")
     }
  }).catch(()=>toast.error("Password Changing Failed"))

  }
}
  return (
    <div>
          <div  className="newpass-pass-main">
          <div className='newpasstop'>
  <div className='keyflex'>
  <i class="fa-solid fa-key fa-lg" style={{color: "black"}}></i>
  <h3>Set Password</h3>
  </div>
</div>        
<div className='newpasssectioncontainer'>
    <i class="fa-solid fa-user-lock fa-2xl" style={{color: "black"}}></i> 

{/* <img src={LogoForNewPass} alt="" className='logonewpass'/> */}
<label htmlFor="">New Password</label>
<div className='inputlkgrp'>
  <div className='divlockpass'><i class="fa-solid fa-lock fa-lg" style={{color: "white"}}></i></div>
<input ref={ref} type="password" value={input.password} name='password' placeholder='Enter The Password' onChange={handlechange}/>

</div>
<p  style={{color:"red"}}>{data.password}</p>

<label htmlFor="" className='mytopnew'>Confirm New Password</label>

<div className='inputlkgrp'>
  <div className='divlockpass'><i class="fa-solid fa-lock fa-lg" style={{color: "white"}}></i></div>
<input ref={ref2} type="password" value={input.confirmpass} name='confirmpass' placeholder='Enter The Confirm Password' onChange={handlechange}/>

</div>
<p  style={{color:"red"}}>{data.confirmpass}</p>

<button onClick={handleclk}>Reset Password</button>


{/* <p className='lastpnewpass'>Dont have an account? <a>Sign Up</a></p> */}
</div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default NewPassword