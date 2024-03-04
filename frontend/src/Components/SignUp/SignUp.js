import React, { useEffect, useRef, useState } from 'react'
import '../SignUp/SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios from '../../Axios/Axios';
function SignUp() {
  const navigate=useNavigate()

const [data, setData] = useState({
  username:"",
  password:"",
  email:"",
  name:"",
  number:""
})
const ref = useRef()
const ref2 = useRef()
const ref3 = useRef()
const ref4 = useRef()
const ref5 = useRef()


const [input, setInput] = useState({
  username:"",
  password:"",
  email:"",
  name:"",
  number:""
})
useEffect(() => {
  const numberInput = document.getElementById('numberInput');
  if (numberInput) {
    const preventWheel = (e) => e.preventDefault();
    numberInput.addEventListener('wheel', preventWheel, { passive: false });

    return () => {
      numberInput.removeEventListener('wheel', preventWheel);
    };
  }
}, []);
function handleChange(event){
  const {name,value}=event.target
  setInput({...input,[name]:value})
}
function handleClick(event){
event.preventDefault()
if(input.name.trim()==""){
  setData({...data,name:"Enter the Full Name"})
ref4.current.style.borderBottom= "3px solid red";

}
else if(input.number===""){
  setData({...data,number:"Enter the Phone Number"})
ref5.current.style.borderBottom= "3px solid red";
}
else if(input.number<0){
  setData({...data,number:"Enter the correct Phone Number"})
ref5.current.style.borderBottom= "3px solid red";
}
 else if(input.username.trim()===""){
    setData({...data,username:"Enter the Username"})
  ref.current.style.borderBottom= "3px solid red";
  }
    else if(input.email.trim()===""){
      setData({...data,email:"Enter the email"})
      ref2.current.style.borderBottom= "3px solid red";
    }
    else if(input.password.trim()===""){
      setData({...data,password:"Enter the password"})
      ref3.current.style.borderBottom= "3px solid red";
    }
   else{
    setInput({...input,password:"",username:"",email:"",number:"",name:""})
    setData({...data,password:"",username:"",email:"",number:"",name:""})
    ref.current.style.borderBottom= "2px solid orange";
    ref2.current.style.borderBottom= "2px solid orange";
    ref3.current.style.borderBottom= "2px solid orange";
    ref4.current.style.borderBottom= "2px solid orange";
    ref5.current.style.borderBottom= "2px solid orange";

    axios.post("/userregister",{
  username:input.username,
  password:input.password,
  email:input.email,
  number:input.number,
  name:input.name
}).then((res)=>{
toast.success("Registered Successfully!")
localStorage.removeItem('token')
setTimeout(() => {
  navigate('/login')

}, 1200);

}).catch(()=>{
  toast.error(" Username or Email was already registered");

})

}}
  return (
    <div> 
      {/* <div className='flexmainsignup'>
      <div className='signupleft'>

</div>
<div  className='signupright'>

</div> */}

<div className='signupdiv'>
<h1>SIGN UP</h1>
<hr />
<div className='texticondiv'>
  <input ref={ref4} type="text" placeholder='Full Name' name='name' value={input.name} className='signupusername ' onChange={handleChange}/><i class="fa-solid fa-user"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.name}</p>

</div>
<div className='texticondiv'>
  <input id='numberInput' ref={ref5} type="number" placeholder='Phone Number' name='number' value={input.number} className='signupusername btnremo' onChange={handleChange}/><i class="fa-solid fa-phone"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.number}</p>

</div>
<div className='texticondiv'>
  <input ref={ref} type="text" placeholder='User Name' name='username' value={input.username} className='signupusername ' onChange={handleChange}/><i class="fa-solid fa-user"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.username}</p>

</div>

<div className='texticondiv'>
  
  <input ref={ref2} type="email" placeholder='Email' name='email' value={input.email} className='signupusername '  onChange={handleChange}/><i class="fa-solid fa-envelope"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.email}</p>

  </div>
<div className='texticondiv'>
  <input ref={ref3} type="password" placeholder='Paswword' name='password' value={input.password} className='signupusername ' onChange={handleChange}/><i class="fa-solid fa-lock"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.password}</p>

  </div>
 <button className='signupbutton' onClick={handleClick} >Get Started</button>
 <ToastContainer/>
 <p className='signupdivp' onClick={()=>navigate('/login ')}>Already have an account? Log In</p>
      </div>
      </div>
     

    // </div>
  ) 
}

export default SignUp