
import React, { useEffect, useState } from 'react';
import '../PlaceOrder/PlaceOrder.css';
import { jsPDF } from 'jspdf';
import axios from '../../Axios/Axios';
function PlaceOrder() {
 
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState(false);


  useEffect(() => {
    const userid = localStorage.getItem('userId');
    const orderid = localStorage.getItem('orderid');

    axios.post('/ordermanage/allorders', { userid, orderid }).then((res) => {
      setData(res.data);
      setData1(res.data[0].products)
      setCoupon(res.data[0].coupon)
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    // Calculate total price whenever the 'data' array changes
    let totalPrice = 0;
    data1.forEach((order) => {
      totalPrice += order.price * order.quantity;
    });
    if(coupon)
    setTotal(totalPrice+60-1000);
else
setTotal(totalPrice+60);

  }, [data]); // Watch for changes in the 'data' array

  const downloadPDF = (e) => {
   
// ... (previous code)


  e.preventDefault();
  const pdf = new jsPDF();

  pdf.text('Order Details', 20, 10);
  pdf.text('--------------------------', 20, 20);

  // Display customer details (only once)
  pdf.text(`Name: ${data.length > 0 ? data[0].name : ""}`, 20, 30);
  pdf.text(`Phone Number: ${data.length > 0 ? data[0].number : ""}`, 20, 40);
  pdf.text(`Order Id: ${data.length > 0 ? data[0].orderid : ""}`, 20, 50);

  let yPosition = 70; // Adjust the Y position for product details

  // Display product details using map
  data1.forEach((order) => {
    pdf.text(`Product: ${order.productname} x${order.quantity}`, 20, yPosition);
    pdf.text(`Price: ${order.price * order.quantity}`, 20, yPosition + 10);

    yPosition += 30; // Adjust the Y position for the next set of product details
  });

  // Display total price

  pdf.text("Shipping Fee:60", 20, yPosition);
 {coupon? pdf.text("Coupon Discount:1000", 20, yPosition+10):pdf.text("", 20, yPosition)}
 {coupon?pdf.text(`Total Price:${total}`, 20, yPosition+20):pdf.text(`Total Price:${total}`, 20, yPosition+10)}


  pdf.save('order_details.pdf');


// ... (rest of the code)

};


  return (
    <div>
      <div className='ordplcmain'>
        <div className='ordplcborder'>
          <div className='ordplcmaintop'>
            <div className='ordplctickdiv'>
              <i className="fa-solid fa-check fa-2xl" style={{ color: "#ffffff" }}></i>
            </div>
            <h1>Your Order Has <br />Been Placed</h1>
          </div>
          <div className='ordplcmainbottom'>
            {/* Display customer details */}
            <p>Name: {data.length > 0 ? data[0].name : ""}</p>
            <p>Phone Number: {data.length > 0 ? data[0].number : ""}</p>
            <p>Order Id: {data.length > 0 ? data[0].orderid : ""}</p>

            {/* Display product details using map */}
            {data1.map((order, index) => (
              <p key={index}>Product: <span >{order.productname}</span><span style={{marginLeft:"20px"}}>x{order.quantity}</span>  <span style={{marginLeft:"20px"}}>₹{order.price*order.quantity}</span> </p>
            ))}

            {/* Display total price */}
            <p>Shipping Fee: ₹60</p>
          { coupon? <p>Coupon Discount: -₹1000</p>:""}


            <p>Total Price: ₹{total}</p>

            <button onClick={downloadPDF}>Print Receipt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
