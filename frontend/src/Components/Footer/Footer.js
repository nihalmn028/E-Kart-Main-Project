import React, {  useEffect, useRef, useState } from 'react'
import '../Footer/Footer.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Footer() {
  useEffect(() => {

  })
  const ref=useRef()
  const navigate=useNavigate()
  const [input, setInput] = useState("")
  const [data, setData] = useState("")
  function btclkk(e){
   
    
    e.preventDefault()
   
      if(input===""){
        
        setData("Enter the email")
        ref.current.style.border= "3px solid red";
        
      }
      else{
        
        setData("")
        setInput("")
        ref.current.style.border= "2px solid orange";
        // toast.success('Email Sent Successfully')
        
     
    
      }
    }

   


  return (
    <div>
   <div className='mainfooter'>
        <div>
        <h2>NEWSLETTER</h2>

<div className='newsletterfooter'>
<input ref={ref} value={input} type="text"  placeholder='Email Address' onChange={(e)=>setInput(e.target.value)}/>
<button onClick={btclkk}><i class="fa-solid fa-arrow-right fa-xl" style={{color: "#ffffff"}}></i></button>

</div>
<p style={{color:"red"}}>{data}</p>

        </div>
        <div className='flexcol'>
        <div className='footericons'>
          <div onClick={()=>window.open("https://www.facebook.com/","_self")}>
          <i class="fa-brands fa-facebook fa-2xl"></i>
          </div>
          <div onClick={()=>window.location.href="https://www.instagram.com/"}>
          <i class="fa-brands fa-square-instagram fa-2xl" ></i>   
                           </div>
          <div onClick={()=>window.location.href="https://twitter.com/?lang=en"}>
          <i class="fa-brands fa-twitter fa-2xl"></i>
                    </div>
          <div onClick={()=>window.location.href="https://www.youtube.com/"}>
          <i class="fa-brands fa-youtube fa-2xl"></i>
                    </div>
        </div>
        <div className='homeflexx'>
       <Link style={{textDecoration:"none",color:"white"}} to={'/'}><span>HOME</span></Link>   
          <span onClick={()=>navigate('/aboutus')}>ABOUT</span>

          <span  onClick={()=>navigate('/contactus')}>CONTACT US</span>

          {/* <span>OUR TEAM</span> */}


        </div>

        </div>

      </div>
      <div style={{backgroundColor:"black"}}>      <div className='hrlastdivfoot'></div>
</div>

   <div className='lastfooter'>

<span className='copyp'>Copyright  © 2024. All rights reserved.</span>
   </div>
   <ToastContainer/>

    </div>
  )
}

export default Footer
