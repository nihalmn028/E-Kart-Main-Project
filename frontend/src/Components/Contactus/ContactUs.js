import React, { useRef, useState } from 'react'
import '../Contactus/ContactUs.css'
function ContactUs() {
const [data, setData] = useState({
  name:"",
  email:"",
  message:""

})
const [data1, setData1] = useState({
  name:"",
  email:"",
  message:""

})
const ref1=useRef()
const ref2=useRef()

const ref3=useRef()
function aboutsnd(){
if(data.name==""){
  setData1({...data1,name:"enter name"});
  ref1.current.style.borderBottom="3px solid red"
}
else if(data.email==""){
  setData1({...data1,email:"enter email"});
  ref2.current.style.borderBottom="3px solid red"

}
else if(data.message==""){
  setData1({...data1,message:"enter message"});
  ref3.current.style.borderBottom="3px solid red"

}
else{
  setData({...data,name:"",email:"",message:""})
  setData1({...data,name:"",email:"",message:""})
  ref1.current.style.borderBottom="2px solid orange"
  ref2.current.style.borderBottom="2px solid orange"
  ref3.current.style.borderBottom="2px solid orange"
}
}
function aboutchnge(e){
const {name,value}=e.target;
setData({...data1,[name]:value})


}
  return (
    <div>
   <div className='contactmainabout'>
        <img  src="https://st4.depositphotos.com/13349494/22390/i/450/depositphotos_223900744-stock-photo-flat-lay-different-devices-wooden.jpg" alt="" />
      <div >
        <h1>Contact Us</h1>
        <div style={{position:"relative"}}>
        <input ref={ref1}  type='text' value={data.name} name='name'  placeholder='Enter Your Full Name' className='loginusertextcontact' onChange={aboutchnge} />
        <p  style={{color:"red",position:"absolute",top:"60px"}} >{data1.name}</p>

        </div>
        <div style={{position:"relative"}}>
        <input ref={ref2}  type='email' value={data.email} name='email'  placeholder='Enter Your Email' className='loginusertextcontact' onChange={aboutchnge}/>
        <p  style={{color:"red",position:"absolute",top:"60px"}} >{data1.email}</p>

        </div>
        <div style={{position:"relative"}}>
        <input ref={ref3}  type='text' value={data.message} name='message'  placeholder='Message' className='loginusertextcontact' onChange={aboutchnge}/>
        <p  style={{color:"red",position:"absolute",top:"60px"}} >{data1.message}</p>

        </div>
        <button className='aboutbtn' onClick={aboutsnd}>Send</button>
      </div>
      </div>
    </div>
  )
}

export default ContactUs