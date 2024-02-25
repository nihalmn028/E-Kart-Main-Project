import React, {  useRef, useState } from 'react'
import '../LoginSection/LoginSection.css'

import axios from '../../Axios/Axios';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginSection() {
  const navigate=useNavigate()
  const [input, setInput] = useState({
    username:"",
    password:"",
  })
const [data, setData] = useState({
  username:"",
  password:""
})
const ref = useRef()
const ref2 = useRef()


 
 
  function handleChange(event){
    const {name,value}=event.target
    setInput({...input,[name]:value})
  }
  function handleClick(event){
  event.preventDefault() 
  if(input.username===""){
    setData({...data,username:"Enter the Username"})
  ref.current.style.borderBottom= "3px solid red";
  }
    else if(input.password===""){
      setData({...data,password:"Enter the password"})
      ref2.current.style.borderBottom= "3px solid red";
    }
   else{
   
    setInput({...input,username:"",password:""});
    setData({...data,username:"",password:""})
    ref.current.style.borderBottom= "2px solid orange";
    ref2.current.style.borderBottom= "2px solid orange";

  axios.post("/userlogin",{
    username:input.username,
    password:input.password,
    
  }).then((res)=>{
   if(res.data.admin)
   {
    toast.success("Login as  Admin Successfull");
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('admin', res.data.admin)

    setTimeout(() => {
      navigate('/')
    }, 1200);
   }
   else{
    toast.success("Login Successfull");
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userId',res.data.userId);
    setTimeout(() => {
      navigate('/')
    }, 1200);

   }
  // console.log(res.data.token);
  


  // localStorage.setItem('loginstatus',true)
    
    // navigate('/',{state:{login:true}})
    
  
  
  }).catch(()=>{
    toast.error("Dont have an account");
  
  })

}
  }

  return (
    <div>
      <div className='loginsection'>
        
        <h1 className='logintitle'>LOGIN</h1>
        <div className='loginusersection'>
        <label htmlFor="username" className='loginuserlabel'>Username </label><br />
        <input ref={ref} type='text' name='username' value={input.username} id='username' placeholder='Enter Your User Name' className='loginusertext' onChange={handleChange}/>
        <p  style={{color:"red"}} >{data.username}</p>

        </div>
        <div className='loginusersection loginmrg'>
        <label htmlFor="password" className='loginuserlabel'>Password </label><br />
        <input ref={ref2} type='password' name='password' value={input.password} className='loginusertext'  placeholder='Enter Your Password ' id='password' onChange={handleChange}/><br />
       <p  style={{color:"red"}}>{data.password}</p>
        <p  className='forgotpasslogin' onClick={()=>navigate('/forgotpass')}>Forgot Password?</p>
        </div>
    
       <div className='btndivlogin'>
     <button className='loginloginbtn' onClick={handleClick}>LOGIN</button>  <br/>
<ToastContainer />
       </div>
        <p className='loginsignup' onClick={()=>navigate('/signup')}>Dont Have An account? Signup</p>
      </div>
  
    
    </div>
  )
}

export default LoginSection
