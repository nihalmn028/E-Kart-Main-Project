import React, { useEffect, useState } from 'react'
import '../NavBar/NavBar.css'
import logoEkart from '../NavBar/NavImages/LOGO  ekart.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'
import axios from '../../Axios/Axios'
function NavBar(props) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashbarOpen, setdashbarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("All");
useEffect(() => {
  localStorage.setItem('search1',search1)

}, [])
useEffect(() => {
  function handleStorageChange(event) {
    if (event.key === 'token' && !event.newValue) {
// Logout logic here
toast.success("Logout Successfull");
localStorage.removeItem('token');
localStorage.removeItem('userId');
localStorage.removeItem('orderid');
localStorage.removeItem('pay');

const isadminn = localStorage.getItem('admin');
if (isadminn) {
  localStorage.removeItem('admin');
}

setTimeout(() => {
  navigate('/login');
}, 1200);
      toast.success("Logout Successfull");
      navigate('/login');
    }
  }

  // Add event listener for storage change
  window.addEventListener('storage', handleStorageChange);

  return () => {
    // Remove event listener when component unmounts
    window.removeEventListener('storage', handleStorageChange);
  };
}, [navigate]);
function handleSearch(event){
setSearch(event.target.value)
}
  function logoclknav() {
    navigate('/')
  }
  function searchclick(){


localStorage.setItem('search',search)
localStorage.setItem('search1',search1)

setSearch("")
  navigate('/searchproduct')


  }
  function loginoutbtn(event) 
  {      

    if (props.login) {

      event.preventDefault()
    
      toast.success("Logout Successfull")


      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('orderid')
      localStorage.removeItem('pay')

      const isadminn = localStorage.getItem('admin')
      if (isadminn) {

        localStorage.removeItem('admin')

      }

      setTimeout(() => {
        navigate('/login')

      }, 1200);

    }
    else {
      navigate('/login')
    }
  }


  function opensidebar() {
    if(props.admin){
      setdashbarOpen(!dashbarOpen);
    }
    else{
      setSidebarOpen(!sidebarOpen);

    }
  }

 
  return (
    <div>

      <div className='navmain'>
        <img src={logoEkart} alt="" className='logonav' onClick={logoclknav} />
        <div className='searchdiv'>
<select name="" id="" style={{padding:"2px",border:"2px solid orange",backgroundColor:"black",color:"white",outline:"none"}} onChange={(event)=>setSearch1(event.target.value)}>
  <option value="All">All</option>
  <option value="Mobile">Mobile</option>
  <option value="Laptop">Laptop</option>
  <option value="Watch">Watch</option>
  <option value="Headphone">Headphone</option>
  <option value="Tablet">Tablet</option>


  </select>         
 <input type="text"  placeholder='Enter The Name Of Product...' className='seachbarnav'  onChange={handleSearch} value={search} />
          <div className='searchiconnav' onClick={searchclick}>
            <i class="fa-solid fa-magnifying-glass fa-lg"></i>
          </div>
        </div>

        <div className='loginsignupbtn'>
          <button className='loginbtnn' onClick={loginoutbtn}>{props.login ? "LOGOUT" : "LOGIN"}</button>


          {props.login ? "" : <Link to={'/signup'}><button className='signupbtnn'>SIGN UP</button></Link>}

          <div className='dashdiv' onClick={opensidebar}><i class="fa-solid fa-bars fa-xl" style={{ color: "#ffffff" }}></i></div>




        </div>

      </div>
      <ToastContainer />


      <div className='positioncrct'>

      </div>
      {props.admin ? <Dashboard dashbaropen={dashbarOpen} /> : <Sidebar sidebarOpen={sidebarOpen} />
      }


    </div>
  )
}

export default NavBar