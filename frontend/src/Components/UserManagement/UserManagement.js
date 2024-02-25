import React, { useEffect, useRef, useState } from 'react'
import '../UserManagement/UserManagement.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios'
import Confirmation from '../Confirmation/Confirmation';
function UserManagement() {
  const navigate=useNavigate()
  
 
  const [conf, setConf] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("/usermanagement/getusers").then((res)=>{
      setData(res.data)
          })
          .catch(()=>{
      console.log("error");
          })
  },[] )
  

  
  function userdeletebtn(data){
setConf(true)
setSelectedUserId(data);   
  }
  function handleDeleteConfirmation() {
    if (selectedUserId) {
      axios.delete("/usermanagement/deleteuser/" + selectedUserId)
        .then((res) => {
          console.log("success");
          setData(prevData => prevData.filter(user => user._id !== selectedUserId));
        })
        .catch(() => {
          // toast.success("error")

          console.log("error");
        });
    }
    setConf(false); // Hide confirmation dialog
  }
  
  return (  
    <div>
<div  className={conf?'opahlf' : 'usermaindivproduct' }>
<div className='userheading'>
<h3 className='userheadprod'>Name</h3>

<h3 className='userheadprodusername'>Username</h3>
<h3 className='userheadqua'> Email</h3>
<h3 className='userheadpr'>Phone No</h3>
<h3 className='userheadaction'>Action</h3>
{/* <h3 className='useraddsec' onClick={()=>navigate('/addproduct')}>+</h3> */}


    


</div>
{data.map((data,index)=>{
  return(
<div style={{display:"flex",flexWrap:"wrap",gap:"100px"}}>
<div className='userproductss'  >
<p className='userpdname' key={index}>{data ? data.fullname :""}</p>
<p className='userpdqn' key={index}>{data ?data.username:""}</p>
<p className='userpdprice ' key={index}> {data ?data.email:""} </p>
<p className='userpphno ' key={index}>{data ?data.phno:""}</p>
</div>
<div className='userflexicnsss' onClick={()=>userdeletebtn(data._id)}>
<i class="fa-solid fa-trash  fa-xl" style={{position:"absolute"}}></i>
</div>
</div>
  )
})}







</div>

<ToastContainer/>
<Confirmation conf={conf} onConfirm={handleDeleteConfirmation} onCancel={() => setConf(false)}/>

    </div>
  )
}

export default UserManagement
