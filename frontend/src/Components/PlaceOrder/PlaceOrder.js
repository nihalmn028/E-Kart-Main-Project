
import React, { useEffect, useState } from 'react';
import '../PlaceOrder/PlaceOrder.css';
import { jsPDF } from 'jspdf';
import axios from '../../Axios/Axios';
function PlaceOrder() {
 
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const userid = localStorage.getItem('userId');
    const orderid = localStorage.getItem('orderid');

    axios.post('/ordermanage/allorders', { userid, orderid }).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    // Calculate total price whenever the 'data' array changes
    let totalPrice = 0;
    data.forEach((order) => {
      totalPrice += order.price * order.quantity;
    });
    setTotal(totalPrice);
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
  data.forEach((order) => {
    pdf.text(`Product: ${order.productname} x${order.quantity}`, 20, yPosition);
    pdf.text(`Price: ${order.price * order.quantity}`, 20, yPosition + 10);

    yPosition += 30; // Adjust the Y position for the next set of product details
  });

  // Display total price
  pdf.text(`Total Price:${total}`, 20, yPosition);

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
            {data.map((order, index) => (
              <p key={index}>Product: {order.productname} x{order.quantity} ₹{order.price*order.quantity} </p>
            ))}

            {/* Display total price */}
            <p>Total Price: ₹{total}</p>

            <button onClick={downloadPDF}>Print Receipt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
