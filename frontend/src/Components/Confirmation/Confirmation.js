
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
