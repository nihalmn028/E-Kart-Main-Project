import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Order/Order.css'
import axios from '../../Axios/Axios'
import { useNavigate } from 'react-router-dom'
function Order() {
  const [show, setShow] = useState(false);
  const [userid, setUserid] = useState("");
  const [productid, setProductid] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    const userid=localStorage.getItem('userId')
 axios.post('/ordermanage/orderslist',{userid}).then((res)=>{
  const reversedData = res.data.reverse();
            
  // Set the reversed data in the state
  setData(reversedData);
 }).catch((err)=>{
  console.log(err);
 })
    
  }, [])
  function cancelbtn(productid,userid){

    setUserid(userid)
    setProductid(productid)
handleShow()
  }
function confirmbtn(){
  axios.post('/ordermanage/cancelorder',{userid,productid}).then((res)=>{
    handleClose()
    toast.success("Your order has been cancelled")
    axios.post('/ordermanage/orderslist',{userid}).then((res)=>{
      const reversedData = res.data.reverse();
                
      // Set the reversed data in the state
      setData(reversedData);
     }).catch((err)=>{
      console.log(err);
     })
  }).catch((err)=>{
    console.log(err)})
 
}
  return (
    <div>
        { data.length==0?<div><h1 style={{margin:"auto",width:"fit-content",marginTop:"40px"}}>No Orders Yet</h1><br/>
      <button className='buynowbtnprcartorder' onClick={()=>navigate('/')}>Start Shopping</button>
      </div>:
      <div className='ordermainn'>
      <h1>Your Orders</h1>
   {data.map((data,index)=>{
      return (
        <div key={index} className='ordersectionn'>
        <div className='ordersecttop'>
          <div className='ordersectopflex'>
            <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap: "200px"}}>
            <div className='ordersectopflexsect'>
            <h3>order Status</h3> 
          <h4>{data.status}</h4>
            </div>
            <div className='ordersectopflexsect'>
            <h3>Price</h3> 
          <h4>₹{data.quantity*data.price} </h4>
            </div>
            </div>
            
            <div className='ordersectopflexsect'>
            <h3 >orderid </h3> 
          <h4>{data.orderid}</h4>
            </div>
          </div>
        </div>
        <div className='ordersectbottom'>
        <div className='imageorderflex'>
        <img src={'http://localhost:3001/images/'+ data.image} alt="" onClick={() => {
                  localStorage.setItem('spid',data.productid)
                  navigate('/singleproduct')}}/>
        <h3>{data.productname}</h3> 
        <h3>x{data.quantity}</h3>
        </div>
        <div className='orderaddress'>
        <h3>delivery address</h3>
        <p>{data.name} <br />{data.number}  <br />{data.email}  <br />{data.address} <br /> {data.city} <br />{data.pin}</p>
      {data.status=="Delivered"?"":<button onClick={()=>cancelbtn(data.productid,data.userid)}>Cancel Order</button>}  
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Cancel your order</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmbtn}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        
       

  
        
      </div>
      )
    })}
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
        
      
      </div>
}
<ToastContainer/>
    </div>
  )
}

export default Order