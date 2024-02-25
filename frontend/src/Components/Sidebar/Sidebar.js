import React from 'react'
import '../Sidebar/Sidebar.css'
import orderimg from './sidebarimages/shopping-bag.png'
import cartimg from './sidebarimages/box.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sidebar(props) {
  const navigate=useNavigate()
  function userprofileclk(){
    const userId=localStorage.getItem('userId')
    if (userId){
navigate('/userprofile')
  }
  else{
    toast.error("please login first")
  }
}
function cartpage(){
  const userId=localStorage.getItem('userId')
    if (userId){
navigate('/allcarts')
  }
  else{
    toast.error("please login first")
  }
}


  return (
    <div>
        <div className={props.sidebarOpen?'sidebaropen':'sidebar'}>
    <div className='usermenu mgtop' onClick={userprofileclk}> 
    <i class="fa-solid fa-user" style={{alignSelf:"center",marginLeft:'5px'}}></i>
    <p style={{alignSelf:"center",paddingTop:"11px",marginLeft:'4px'}}>Profle</p> 
    </div>
    {/* <div className='usermenu ' onClick={()=>navigate('/allproducts')}>
      <img src={cartimg} alt="" style={{width:"30px",height:"30px"}} />
      <p style={{alignSelf:"center",paddingTop:"11px"}}>All Products</p></div> */}
    <div className='usermenu '> 
    <img src={orderimg} alt="" style={{width:"25px",height:"25px"}}/>

    <p style={{alignSelf:"center",paddingTop:"14px"}}>Orders</p></div>
    <div className='usermenu mgtop' onClick={cartpage}> 
    <i class="fa-solid fa-cart-shopping"></i>    <p style={{alignSelf:"center",paddingTop:"11px"}}>Cart</p> 
    </div>

    </div>
<ToastContainer/>
    </div>
  )
}

export default Sidebar