import React from 'react'
import '../Ekartlogonav/Logoekart.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import stylelogo from '../Ekartlogonav/NavImages/LOGO  ekart.png'
import { useNavigate } from 'react-router-dom'
function Logoekart() {
 const navigate= useNavigate()
  return (
    <div>
            <img className='logoimgg' src={stylelogo} style={{margin:"auto",width:"160px",display:"block"}} onClick={()=>navigate('/')}></img>
<ToastContainer/>
    </div>
  )
}

export default Logoekart