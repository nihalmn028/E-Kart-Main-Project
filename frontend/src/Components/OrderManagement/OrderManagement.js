
import React, { useEffect, useState } from 'react'
import '../OrderManagement/OrderManagement.css'
import axios from '../../Axios/Axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderManagement() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/ordermanage/orderview').then((res) => {
      const reversedData = res.data.reverse();
            
      // Set the reversed data in the state
      setData(reversedData);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  function statuschange(event, productid, userid) {
    const newStatus = event.target.value;
    axios.post('/ordermanage/statuschange', {
      productid: productid,
      userid: userid,
      status: newStatus
    }).then((res) => {
      toast.dismiss()
     toast.success('Status changed successfully');
    }).catch((err) => {
      console.error('Error changing status:', err);
    });
  }

  return (
    <div>
      <div className='orderusermaindivproduct'>
        <div className='orderuserheading'>
          <h3 className='orderuserheadprodusername'>Name</h3>
          <h3 className='orderuserheadqua'> Email</h3>
          <h3 className='orderuserheadpr'>Product</h3>
          <h3 className='orderuserheadaction'>Status</h3>
        </div>
        {
          data.map((item, index) => {
            return (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "55px" }} key={index}>
                <div className='orderuserproductss'>
                  <p className='orderuserpdqn'>{item.name}</p>
                  <p className='orderuserpdprice'>{item.email}</p>
                  <p className='orderuserpphno'>{item.productname}</p>
                </div>
                <div className='orderuserflexicnsss'>
                  <select onChange={(event) => statuschange(event, item.productid, item.userid)}>
                    <option value={item.status}>{item.status}</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            )
          })
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default OrderManagement;
