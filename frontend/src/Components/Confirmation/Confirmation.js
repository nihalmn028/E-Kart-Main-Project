// import React, { useState } from 'react'
// import '../Confirmation/Confirmation.css'
// import { useNavigate } from 'react-router-dom'
// import axios from '../../Axios/Axios'
// function Confirmation(props) {
//   const navigate=useNavigate()
//   // const [first, setfirst] = useState(false)
//   // setfirst(props.conf)
//   function btncanc(){
// // setfirst(props.conf)
// // navigate('/usermanagement')
//   }
//  function btndlt(){

//   // const data=localStorage.getItem('userid')
//   // axios.delete("/usermanagement/deleteuser/"+data).then((res)=>{
//   //   console.log("success");
//   //   setfirst(false)
//   // })
//   //       .catch(()=>{
//   //   console.log("error");
//   //       })


//  }
//   return (
//     <div>
//       <div className={props.conf ? 'conmainaft' : 'conmain'}>
//       {/* <div className='conmain'> */}
//         <p>Are you sure you want to delete</p>
//         <div style={{display:"flex",alignItems:"center",gap:"40px",margin:"auto",width:"fit-content",marginTop:"65px"}}>
//         <button className='concancbtn' onClick={btncanc}>Cancel</button>        <button className='condltbtn' onClick={btndlt}>Delete</button>

//         </div>

//       </div>
//     </div>
//   )
// }

// export default Confirmation
import React from 'react';
import '../Confirmation/Confirmation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Confirmation({ conf, onConfirm, onCancel }) {
  return (
    <div className={conf ? 'conmainaft' : 'conmain'}>
      <p>Are you sure you want to delete?</p>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", margin: "auto", width: "fit-content", marginTop: "65px" }}>
        <button className='concancbtn' onClick={onCancel}>Cancel</button>
        <button className='condltbtn' onClick={onConfirm}>Delete</button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Confirmation;
