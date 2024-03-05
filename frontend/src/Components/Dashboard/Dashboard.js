import React from 'react'
import '../Dashboard/Dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
function Dashboard(props) {
  const navigate =useNavigate()
  return (
    <div>
       <div className={`sidebardash ${props.dashbaropen ? 'open' : ''}`}>
   {/* <div className='sidebardash'> */}
<div className='dashmaindiv'>
  <h2>Dashboard</h2>
</div>
{/* <div className='dashsubdiv'> */}
<div className='dashsect mt20' onClick={()=>navigate('/overview')}>Overview
</div>
  <div className='dashsect mt20' onClick={()=>navigate('/usermanagement')}>User Management
</div>
<div className='dashsect' onClick={()=>navigate('/productmanagement')}>Product Management
</div>
<div className='dashsect' onClick={()=>navigate('/ordermanagement')}>Order Management
</div>


{/* </div> */}
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Dashboard