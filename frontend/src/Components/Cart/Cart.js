
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios';
import '../Cart/Cart.css';

import { useNavigate } from 'react-router-dom';
import Confirmation from '../Confirmation/Confirmation';

function Cart() {
  const [selectedQuantity, setSelectedQuantity] = useState([]);
  const ref=useRef()
  const [coupon,setCoupon]=useState(false);
  const [coupon2,setCoupon2]=useState("");

  const [coupon1,setCoupon1]=useState("");

  const [data, setData] = useState([]);
  const [qnt, setQnt] = useState([]);
  const [conf, setConf] = useState(false);
  const [SelectedProductId, setSelectedProductId] = useState(null);
  const [SelectedUserId, setSelectedUsertId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get('/cartmanage/allcarts/' + userId)
      .then((res) => {
        
        const reversedData = res.data.reverse();
        setData(reversedData);
        const options = res.data.map(item => {
          const itemOptions = [];
          for (let i = 1; i <= item.quantity; i++) {
            itemOptions.push(i);
          }
          return itemOptions;
        });
        
        setQnt(options);
        const defaultQuantity = res.data.map((item) =>item.quantity>item.selectedquantity?item.selectedquantity:item.quantity);
        setSelectedQuantity(defaultQuantity);
        const totalPrice = res.data.reduce((acc, item, index) => {
          return acc + (item.price * defaultQuantity[index]);
        }, 0);
        setTotalPrice(totalPrice);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  function handleQuantityChange(event, index) {
    const newQuantity = parseInt(event.target.value);
    const updatedSelectedQuantity = [...selectedQuantity];
    updatedSelectedQuantity[index] = newQuantity;
    setSelectedQuantity(updatedSelectedQuantity);
    // Recalculate total price when quantity changes
    const totalPrice = data.reduce((acc, item, idx) => {
      return acc + (item.price * updatedSelectedQuantity[idx]);
    }, 0);
    setTotalPrice(totalPrice);
  }

  function handleclkdlt(data, user) {
    setConf(true);
    setSelectedProductId(data);
    setSelectedUsertId(user);
  }

  
  function handleDeleteConfirmation() {
    if (SelectedProductId) {
      axios.post("/cartmanage/deletecart", { productid: SelectedProductId, userid: SelectedUserId })
        .then((res) => {
          localStorage.removeItem('pid');
          console.log("success");
          setData(prevData => prevData.filter(user => user.productid !== SelectedProductId));
          
          const totalPriceAfterDeletion = data.reduce((acc, item, idx) => {
            if (item.productid !== SelectedProductId) {
              return acc + (item.price * selectedQuantity[idx]);
            }
            return acc; 
          }, 0);
          setTotalPrice(totalPriceAfterDeletion);
        })
        .catch(() => {
          console.log("error");
        });
    }
    setConf(false);
  }
  function checkoutclk() {
    const userid = localStorage.getItem('userId');

    const selectedProducts = data.map((item, index) => ({
      productName: item.productname,
      productid:item.productid,
      price: item.price,
      image:item.image,
      category: item.category,
      quantity: selectedQuantity[index],
      coupon,
      userid
    }));

    axios.post('/cartmanage/checkoutadd', { selectedProducts})
      .then((res) => {
        navigate('/checkout');
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  }
  
  function couponclk(){
if(coupon2==""){
setCoupon1("Enter the Coupon Code")
ref.current.style.border="3px solid red"
}

else{
  axios.post('/cartmanage/coupon',{coupon2}).then((res)=>{
setTotalPrice(totalPrice-1000)
setCoupon(true)
setCoupon1("")
setCoupon2("")

ref.current.style.border="2px solid orange"


  }).catch((err)=>{
   

    
    setCoupon1("Enter valid coupon")
    setCoupon2("")
    
    ref.current.style.border="2px solid red"
    console.log(err);
  })
}
  }
  return (
    <div>
      { data.length==0?<div><h1 style={{margin:"auto",width:"fit-content",marginTop:"40px"}}>Your  cart is empty!</h1><br/>
      <button className='buynowbtnprcart' onClick={()=>navigate('/')}>Buy Now</button>
      </div>:
      <div className={conf ? 'mainalldivaf' : 'mainalldiv'}>
        <h1 style={{marginLeft:"20px",marginTop:"20px"}}>Shopping Cart</h1>
        {data.map((data, index) => {
          return (
            <div style={{position:"relative"}}>
            <div  style={{ display: "flex", gap: "20px", alignItems: "center", }} key={index}>
              <div className={data.quantity==0?'cartmaindivmain':'cartmaindiv'}>
                <img src={'http://localhost:3001/images/' + data.image} alt="" onClick={() => {
                  localStorage.setItem('spid', data.productid)
                  navigate('/singleproduct')
                }} />
                <h2 style={{ width: "260px" }}>{data.productname}</h2>
                <div className='qntflexdivcart' style={{ width: "260px" }}>
                  <p className='qntpcart'>Quantity</p>
                  <select name="" id="" onChange={(event) => handleQuantityChange(event, index)} value={selectedQuantity[index]}>
                    {qnt[index].map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <h2 style={{ width: "260px" }}>₹{data.price * selectedQuantity[index]}</h2>
              </div>
              <i className="fa-solid fa-trash fa-xl" onClick={() => handleclkdlt(data.productid, data.userid)}></i>
            </div>
                       {data.quantity==0? <h2 style={{position:'absolute',top:'110px',left:'20px',color:'red',opacity:1}}>Out Of Stock</h2>:""}
                       </div>

          )
        })}
       <div style={{display:"flex",alignItems:"center",gap:"400px",marginTop:"20px",marginLeft:"40px",marginBottom:"30px"}}>
        <div   style={{display:"flex",alignItems:"center",gap:'20px',position:'relative'}}>
          <input ref={ref} className='coupentext' type="text" value={coupon2} placeholder='Enter Coupon Code' onChange={(event)=>setCoupon2(event.target.value)}/>
<button className='checkoutbtncart2' onClick={couponclk}>Apply</button>
<p style={{position:"absolute",top:"43px",left:"10px",color:"red"}}>{coupon1}</p>
        </div>
        <div className='totagrpcart'>
        {coupon?<div className='totalcart'>
          
          <h3 style={{width:"130px"}}>Coupon:</h3>
          <h3>-₹1000</h3>
        </div>:""}
        <div className='totalcart' >
          
          <h2 style={{width:"140px"}}>Total:</h2>
          <h3>₹{totalPrice}</h3>
        </div>
        <button className='checkoutbtncart' onClick={checkoutclk}>Checkout</button>
      </div>
       </div>
      
      </div>}
    
      <Confirmation conf={conf} onConfirm={handleDeleteConfirmation} onCancel={() => setConf(false)} />
      <ToastContainer/>
    </div>
      
  )
}

export default Cart;
