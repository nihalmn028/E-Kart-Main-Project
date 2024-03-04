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
  const [orderid, setOrderid] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate()
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])


  useEffect(() => {
    const userid=localStorage.getItem('userId')
 axios.post('/ordermanage/orderslist',{userid}).then((res)=>{
  const reversedData = res.data.reverse();
            
  setData(reversedData);
  console.log(data1);
 }).catch((err)=>{
  console.log(err);
 })
    
  }, [])
  function cancelbtn(orderid,userid){

    setUserid(userid)
    setOrderid(orderid)
handleShow()
  }
function confirmbtn(){
  axios.post('/ordermanage/cancelorder',{userid,orderid}).then((res)=>{
    handleClose()
    axios.post('/ordermanage/orderslist',{userid}).then((res)=>{
      const reversedData = res.data.reverse();
                
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
     const totalPrice = data.products.reduce((sum, product) => sum + product.quantity * product.price, 0);
      return (
        <div key={index} className='ordersectionn'>
        <div className='ordersecttop'>
          <div className='ordersectopflex'>
            <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap: "200px"}}>
            <div className='ordersectopflexsect'>
            <h3>Order Status</h3> 
          <h4>{data.status}</h4>
            </div>
            <div className='ordersectopflexsect'>
            <h3>Total Price</h3> 
        {data.coupon?  <h4>₹{totalPrice+60-1000} </h4>:<h4>₹{totalPrice+60} </h4>}
            </div>
            </div>
            
            <div className='ordersectopflexsect'>
            <h3 >Order Id </h3> 
          <h4>{data.orderid}</h4>
            </div>
          </div>
        </div>
        <div className='ordersectbottom'>
          { data.products.map((data2, index2) => (
            
        <div key={index2} className='imageorderflex'>
        <img src={'http://localhost:3001/images/'+ data2.image} alt="" onClick={() => {
                  localStorage.setItem('spid',data2.productid)
                  navigate('/singleproduct')}}/>
        <h3 style={{width:"150px"}}>{data2.productname}</h3> 
        <h3 style={{width:"30px"}}>x{data2.quantity}</h3>
        <h3>₹{data2.price*data2.quantity}</h3>

        </div> ))}
        <div style={{display:"flex",alignItems:"center",marginLeft:"360px",marginTop:"20px"}}>        <h4 style={{width:"190px"}}>Shipping Fee: </h4><h4>+₹60</h4>
</div>   { data.coupon? <div style={{display:"flex",alignItems:"center",marginLeft:"360px",marginTop:"10px"}}>        <h4 style={{width:"190px"}}>Discount: </h4><h4>-₹1000</h4>
</div>:""}
        <div className='orderaddress'>
        <h3>delivery address</h3>
        <p>{data.name} <br />{data.number}  <br />{data.email}  <br />{data.address} <br /> {data.city} <br />{data.pin}</p>
        {data.status=="Delivered"||data.status=="Cancelled" ?"":  <button style={{marginRight:"20px"}} onClick={()=>{
        localStorage.setItem('userId',data.userid)
        localStorage.setItem('orderid',data.orderid)
        localStorage.setItem('pay','false')

        navigate('/orderplace')}}>Order Details</button>  }
      {data.status=="Delivered"||data.status=="Cancelled" ?"":<button onClick={()=>cancelbtn(data.orderid,data.userid)}>Cancel Order</button>}
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