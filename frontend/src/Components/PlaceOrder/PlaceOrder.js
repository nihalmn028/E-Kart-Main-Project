
import React, { useEffect, useState } from 'react';
import '../PlaceOrder/PlaceOrder.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import axios from '../../Axios/Axios';
function PlaceOrder() {
 
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState(false);


  useEffect(() => {
    const userid = localStorage.getItem('userId');
    const orderid = localStorage.getItem('orderid');
    const pay = localStorage.getItem('pay');

    axios.post('/ordermanage/allorders', { userid, orderid ,pay}).then((res) => {
      setData(res.data);
      setData1(res.data[0].products)
      setCoupon(res.data[0].coupon)
localStorage.setItem('pay','false')
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
  e.preventDefault();
  const pdf = new jsPDF();
  const lineHeight = 10;

  // Invoice Header
  pdf.setFontSize(18);
  pdf.text('Invoice', 20, 10);

  // Customer Information
  pdf.setFontSize(12);
  pdf.text('Customer Details:', 20, 30);
  pdf.text(`Name: ${data.length > 0 ? data[0].name : ""}`, 20, 40);
  pdf.text(`Phone Number: ${data.length > 0 ? data[0].number : ""}`, 20, 50);
  pdf.text(`Order Id: ${data.length > 0 ? data[0].orderid : ""}`, 20, 60);
  // pdf.text(` Delivery Address: ${data.length > 0 ? data[0].address : ""},${data.length > 0 ? data[0].city : ""},${data.length > 0 ? data[0].pin : ""}`, 20, 70);
  const addressText = `Delivery Address: ${data.length > 0 ? data[0].address : ""}, ${data.length > 0 ? data[0].city : ""}, ${data.length > 0 ? data[0].pin : ""}`;
  const addressLines = pdf.splitTextToSize(addressText, pdf.internal.pageSize.width - 40);
  pdf.text(addressLines, 20, 70);


  // Invoice Table
  const headers = [['Product Name', 'Quantity', 'Price']];
  const rows = data1.map((order) => [order.productname, order.quantity, `${order.price * order.quantity}`]);

  pdf.autoTable({
    startY: 80,
    head: headers,
    body: rows,
    theme: 'grid',
  });

  // Invoice Summary
  const summaryY = pdf.autoTable.previous.finalY + lineHeight * 2;
  pdf.text(`Shipping Fee: 60`, 20, summaryY);
  if (coupon) {
    pdf.text(`Coupon Discount: -₹1000`, 20, summaryY + lineHeight);
  }

  pdf.setFont('bold');
  const totalPriceY = summaryY + (coupon ? lineHeight * 2 : lineHeight);
  pdf.text(`Total Price: ${total}`, 20, totalPriceY);
  pdf.setFont('normal');

  // Save PDF
  pdf.save('invoice.pdf');
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
