import React, { useEffect, useState } from 'react'
import '../Overview/Overview.css'
import {Chart as ChartJs} from "chart.js/auto"
import {Bar,Doughnut,Line} from "react-chartjs-2"
import axios from '../../Axios/Axios'
function Overview() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios.get('/ordermanage/overview')
      .then((res) => {
        setOrderData(res.data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 
    const ordersWithTrue = orderData.filter(order => order.order);
  const productRevenue = {};
   ordersWithTrue.forEach(order => {
       order.products.forEach(product => {
      const category = product.category;
         const price = product.price * product.quantity;
        productRevenue[category] = (productRevenue[category] || 0) + price;
      });
     });
  return (
    <div>
      <div  className="overviewmain">
      <Bar
      
      data={{
        labels:['Mobile', 'Laptop', 'Headphone', 'Tablet', 'Watch'],
        datasets:[
          {
            label: 'Total Revenue',
            data: [productRevenue.Mobile, productRevenue.Laptop, productRevenue.Headphone, productRevenue.Tablet, productRevenue.Watch],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          }
        ]
      }}
      />
      </div>
      <div  className="overviewmaindou">
      <Doughnut
      
      data={{
        labels:['Mobile', 'Laptop', 'Headphone', 'Tablet', 'Watch'],
        datasets:[
          {
            label: 'Total Revenue',
            data: [productRevenue.Mobile, productRevenue.Laptop, productRevenue.Headphone, productRevenue.Tablet, productRevenue.Watch],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            borderWidth: 1,
          }
        ]
      }}
      />
      </div>
     
    </div>
  )
}

export default Overview

