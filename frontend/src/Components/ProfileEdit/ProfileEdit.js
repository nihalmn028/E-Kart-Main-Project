import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios from '../../Axios/Axios';
import '../ProfileEdit/ProfileEdit.css'
function ProfileEdit() {
  const navigate=useNavigate()
  const [input, setInput] = useState({
    username:"",
    email:"",
    name:"",
    number:""
  })
useEffect(() => {
  const userId=localStorage.getItem('userId');

  axios.post('/userprofile/view',{userId}).then((res)=>{
    
    setInput(res.data)
    // setData({...data,fullname:res.data.fullname,
    // username:res.data.username,
    // email:res.data.email,
    // phno:res.data.phno})
       })
       .catch(()=>{
    console.log("error");
       })
       const numberInput = document.getElementById('numberInput');
   
       if (numberInput) {
         const preventWheel = (e) => e.preventDefault();
         numberInput.addEventListener('wheel', preventWheel, { passive: false });
   
   
         return () => {
           numberInput.removeEventListener('wheel', preventWheel);
   
         };
       }
   
}, [])

const [data, setData] = useState({
  username:"",
  email:"",
  name:"",
  number:""
})
const ref = useRef()
const ref2 = useRef()
const ref4 = useRef()
const ref5 = useRef()



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
 
   else{
    setInput({...input,username:"",email:"",number:"",name:""})
    setData({...data,username:"",email:"",number:"",name:""})
    ref.current.style.borderBottom= "2px solid orange";
    ref2.current.style.borderBottom= "2px solid orange";
    ref4.current.style.borderBottom= "2px solid orange";
    ref5.current.style.borderBottom= "2px solid orange";
const userId=localStorage.getItem('userId');
    axios.put("/profileedit",{
  username:input.username,
  email:input.email,
  number:input.number,
  name:input.name,
  userId:userId
}).then((res)=>{
toast.success("Profile Changed Successfully!")
setTimeout(() => {
  navigate('/userprofile')

}, 1200);

}).catch(()=>{
  toast.error(" Something went wrong");

})

}}
  return (
    <div>
      <div className='editsignupdiv'>
<h1>Profile</h1>
<hr />
<div className='edittexticondiv'>
  <input ref={ref4} type="text" placeholder='Full Name' name='name' value={input.name} className='editsignupusername ' onChange={handleChange}/><i class="fa-solid fa-user"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.name}</p>

</div>
<div className='edittexticondiv'>
  <input id='numberInput' ref={ref5} type="number" placeholder='Phone Number' name='number' value={input.number} className='editsignupusername btnremo' onChange={handleChange}/><i class="fa-solid fa-phone"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.number}</p>

</div>
<div className='edittexticondiv'>
  <input ref={ref} type="text" placeholder='User Name' name='username' value={input.username} className='editsignupusername ' onChange={handleChange}/><i class="fa-solid fa-user"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.username}</p>

</div>

<div className='edittexticondiv'>
  
  <input ref={ref2} type="email" placeholder='Email' name='email' value={input.email} className='editsignupusername ' onChange={handleChange}/><i class="fa-solid fa-envelope"></i><br />
  <p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.email}</p>

  </div>

 <button className='editsignupbutton' onClick={handleClick} >Save</button>
 <ToastContainer/>
      </div>
    </div>
  )
}

export default ProfileEdit