import React, { useEffect, useRef, useState } from 'react'
import favicon from '../Checkout/razorimage/favicon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios from '../../Axios/Axios';
import '../Checkout/Checkout.css'
function Checkout() {
const [data1, setData1] = useState([])
const [key, setKey] = useState("")
const [datas, setDatas] = useState()
const [subtotal, setSubtotal] = useState(0)
const [total, setTotal] = useState(0)

const [orderid, setOrderid] = useState("")
const [coupon, setCoupon] = useState(false)


  useEffect(() => {
    const userid=localStorage.getItem('userId')
    axios.get('/cartmanage/checkoutview/'+userid)
      .then((res) => {
        const revdata=res.data.reverse()
        setData1(revdata);
        setCoupon(res.data[0].coupon)
        const total = revdata.reduce((acc, item) => {
          return acc + (item.price * item.quantity);
        }, 0);

        setSubtotal(total);
       if(coupon)
       setTotal(subtotal+60-1000)
      else
      setTotal(subtotal+60)
      })
      .catch(() => {
        console.log("error");
      });
      
        const numberInput = document.getElementById('numberInput');
        const numberInput1 = document.getElementById('numberInput1');

        if (numberInput || numberInput1) {
          const preventWheel = (e) => e.preventDefault();
          numberInput.addEventListener('wheel', preventWheel, { passive: false });
          numberInput1.addEventListener('wheel', preventWheel, { passive: false });

    
          return () => {
            numberInput.removeEventListener('wheel', preventWheel);
            numberInput1.removeEventListener('wheel', preventWheel);

          };
        }
   
  }, [subtotal]);
    const navigate=useNavigate()
    const [input, setInput] = useState({
      address:"",
      email:"",
      name:"",
      number:"",
      city:"",
      pin:""
    })
 
  
  const [data, setData] = useState({
    address:"",
    email:"",
    name:"",
    number:"",
    city:"",
    pin:""
  })
  const ref = useRef()
  const ref2 = useRef()
  const ref4 = useRef()
  const ref5 = useRef()
  const ref6 = useRef()
  const ref7 = useRef()

  
  
  
  function handleChange(event){
    const {name,value}=event.target
    setInput({...input,[name]:value})
  }
  function handleClickproceed(event){

  event.preventDefault()
  
  if(input.name.trim()==""){
    setData({...data,name:"Enter the Full Name"})
  ref4.current.style.borderBottom= "3px solid red";
  
  }
  else if(input.number===""){
    setData({...data,number:"Enter the Phone Number"})
  ref5.current.style.borderBottom= "3px solid red";
  }
  else if(input.number<0){
    setData({...data,number:"Enter the correct Phone Number"})
  ref5.current.style.borderBottom= "3px solid red";
  }
      else if(input.email.trim()===""){
        setData({...data,email:"Enter the email"})
        ref2.current.style.borderBottom= "3px solid red";
      }
      else if(input.address.trim()===""){
        setData({...data,address:"Enter the Address"})
      ref.current.style.borderBottom= "3px solid red";
      }
      else if(input.city.trim()===""){
        setData({...data,city:"Enter the City"})
      ref6.current.style.borderBottom= "3px solid red";
      }
      else if(input.pin===""){
        setData({...data,pin:"Enter the Pincode"})
      ref7.current.style.borderBottom= "3px solid red";
      }
      else if(input.pin<0){
        setData({...data,pin:"Enter the correct Pincode"})
      ref7.current.style.borderBottom= "3px solid red";
      }
     else{
      setInput({...input,address:"",email:"",number:"",name:"",city:"",pin:""})
      setData({...data,address:"",email:"",number:"",name:"",city:"",pin:""})
      ref.current.style.borderBottom= "2px solid orange";
      ref2.current.style.borderBottom= "2px solid orange";
      ref4.current.style.borderBottom= "2px solid orange";
      ref5.current.style.borderBottom= "2px solid orange";
      ref6.current.style.borderBottom= "2px solid orange";

      ref7.current.style.borderBottom= "2px solid orange";
// console.log(total/100);
      axios.get('/checkout/getkey').then((res)=>{
        setKey(res.data.key);
      
       }).catch(()=>{
        console.log("error");
       })
       if(coupon) {
      var  amount=(subtotal+60-1000)*100}
       else{
       amount=(subtotal+60)*100
      }
       axios.post('/checkout/payment', {
     amount:amount
      }).then((res)=>{
        const orderId = res.data.id;
        localStorage.setItem('orderid',orderId) 
        localStorage.setItem('pay','true') 

        setOrderid(orderId);
        const userid = localStorage.getItem('userId');
        const selectedProducts = data1.map((item, index) => ({
          productName: item.productname,
          productid: item.productid,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          category: item.category,
        }));
      
        // Now, proceed with the addorder API call
    
        axios.post('/ordermanage/addorder', {
          selectedProducts,
          userid,
          orderid: orderId, // Use the captured order ID here
          email: input.email,
          address: input.address,
          name: input.name,
          city: input.city,
          number: input.number,
          pin: input.pin,
          coupon,
          total:total
          
        }).then((res) => {
      
          // Handle the response as needed
        }).catch(() => {
          console.log("Error in addorder API");
        });

      var options = {
        key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "E-kart",
        description: "razor payment",
        image: favicon,
        order_id: res.data.id,
        callback_url:'http://localhost:3001/checkout/paymentverify',
        prefill: {
            name: "E-kart",
            email: "E-kart@example.com",
            contact: "123456789"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#FFA500"
        }
      };
      var razor = new window.Razorpay(options);
      razor.open();

      
      }).catch(()=>{
        console.log("error");
       })
      
  }



        
  }
  return (
    <div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"100px",justifyContent:"center"}}>

    <div className='checkoutsignupdiv'>
<h1>Checkout</h1>
<hr />
<div className='checkouttexticondiv'>
<input ref={ref4} type="text" placeholder='Name' name='name' value={input.name} className='checkoutsignupusername ' onChange={handleChange}/><i class="fa-solid fa-user"></i><br />
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.name}</p>

</div>
<div className='checkouttexticondiv'>
<input id='numberInput' ref={ref5} type="number" placeholder='Phone Number' name='number' value={input.number} className='checkoutsignupusername btnremo' onChange={handleChange}/><i class="fa-solid fa-phone"></i><br />
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.number}</p>

</div>


<div className='checkouttexticondiv'>

<input ref={ref2} type="email" placeholder='Email' name='email' value={input.email} className='checkoutsignupusername ' onChange={handleChange}/><i class="fa-solid fa-envelope"></i><br />
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.email}</p>

</div>
<div className='checkouttexticondiv'>
<input ref={ref} type="text" placeholder='Address' name='address' value={input.address} className='checkoutsignupusername ' onChange={handleChange}/><i class="fa-solid fa-location-pin"></i><br />
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.address}</p>

</div>
<div className='checkouttexticondiv'>
<input ref={ref6} type="text" placeholder='City' name='city' value={input.city} className='checkoutsignupusername ' onChange={handleChange}/><i class="fa-solid fa-location-pin"></i><br />
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.city}</p>

</div>
<div className='checkouttexticondiv'>
<input id='numberInput1' ref={ref7} type="number" placeholder='Pincode' name='pin' value={input.pin} className='checkoutsignupusername ' onChange={handleChange}/><i class="fa-solid fa-location-pin"></i><br />
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.pin}</p>

</div>


    </div>
    <div style={{marginTop:"100px"}}>
       {data1.map((data1, index) => {
         

        return(
        data1.quantity==0?"":  <div className='checkoutrightdivv'>
          <img src={'http://localhost:3001/images/'+ data1.image} alt="" onClick={() => {
                  localStorage.setItem('spid',data1.productid)
                  navigate('/singleproduct')}}/>
          <h3 style={{width:"300px",marginLeft:"20px"}} key={index}>{data1.productname}</h3>
          <h3 style={{width:"150px"}} key={index}>qty:{data1.quantity}</h3>
          <h3 key={index}>₹{data1.price*data1.quantity}</h3>

              </div>
        )
      })}
   
   <div className='checklinediv'></div>
   <div className='checkprices'>
   <div style={{display:"flex",marginTop:"30px"}}><h4 style={{width:"170px"}}>Sub total:</h4><h4>₹{subtotal}</h4></div>
   <div style={{display:"flex"}}><h4 style={{width:"170px"}}>Shipping fee:</h4><h4>₹60</h4></div>
   <div style={{display:"flex"}}><h4 style={{width:"170px"}}>Total:</h4>{coupon?<h4>₹{subtotal+60-1000}</h4>:<h4>₹{subtotal+60}</h4>}</div>
   <button className='checkoutsignupbutton' onClick={handleClickproceed} >Procceed</button>

   </div>


   </div>
    </div>
    <ToastContainer/>
  </div>
  )
}

export default Checkout