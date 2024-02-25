import React, { useState } from 'react'
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
  const [search, setSearch] = useState();
function handleSearch(event){
setSearch(event.target.value)
}
  function logoclknav() {
    navigate('/')
  }
  function searchclick(){
axios.get('/productmanagement/search/'+search).then((res)=>{
setSearch("")
const arr=JSON.stringify(res.data)
localStorage.setItem('searchid',arr)

  navigate('/searchproduct')
}).catch((err)=>{
console.log(err);
})

  }
  function loginoutbtn(event) 
  {      

    if (props.login) {

      event.preventDefault()
    
      toast.success("Logout Successfull")


      localStorage.removeItem('token')
      localStorage.removeItem('userId')
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