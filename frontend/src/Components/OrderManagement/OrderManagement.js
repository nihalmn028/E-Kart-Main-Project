
import React, { useEffect, useState } from 'react'
import '../OrderManagement/OrderManagement.css'
import axios from '../../Axios/Axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confirmation from '../Confirmation/Confirmation';

function OrderManagement() {
  const [data, setData] = useState([])
  const [conf, setConf] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios.get('/ordermanage/orderview').then((res) => {
      const reversedData = res.data.reverse();
            
      // Set the reversed data in the state
      setData(reversedData);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  function statuschange(event, userid,orderid) {

    const newStatus = event.target.value;
    axios.post('/ordermanage/statuschange', {
      
      userid: userid,
      orderid: orderid,
      status: newStatus
    }).then((res) => {
     axios.get('/ordermanage/orderview').then((res) => {
      const reversedData = res.data.reverse();
      setData(reversedData);
    
    }).catch((err) => {
      console.log(err);
    })
    }).catch((err) => {
      console.error('Error changing status:', err);
    });
  }
  function userdeletebtn(data){
    setConf(true)
    setSelectedUserId(data);   
      }
      function handleDeleteConfirmation() {
        if (selectedUserId) {
          axios.delete("/ordermanage/deleteorder/" + selectedUserId)
            .then((res) => {
              console.log("success");
              axios.get('/ordermanage/orderview').then((res) => {
                const reversedData = res.data.reverse();
                      
                // Set the reversed data in the state
                setData(reversedData);
              }).catch((err) => {
                console.log(err);
              })
            })
            .catch(() => {
              // toast.success("error")
    
              console.log("error");
            });
        }
        setConf(false); 
      }

  return (
    <div>
      <div className={conf?'orderusermaindivproductop':'orderusermaindivproduct'}>
        <div className='orderuserheading'>
        <h3 style={{width:"220px"}} className='orderuserheadprodusername'>Order Id</h3>
        <h3 style={{width:"240px"}} className='orderuserheadprodusername'>User Id</h3>

          <h3 style={{width:"170px"}} className='orderuserheadprodusername'>Name</h3>
          <h3 style={{width:"195px"}} className='orderuserheadqua'> Email</h3>
          <h3 style={{width:"180px"}} className='orderuserheadqua'> Total Price</h3>

          {/* <h3 className='orderuserheadpr'>Product</h3> */}
          <h3 className='orderuserheadaction'>Status</h3>
        </div>
        {
          data.map((item, index) => {
            return (
              <div style={{ display: "flex", flexWrap: "wrap",gap:"40px",alignItems:"center"  }} key={index}>
                <div className='orderuserproductss'>
                <p style={{width:"220px"}} className='orderuserpdqn'>{item.orderid}</p>
                <p style={{width:"240px"}} className='orderuserpdqn'>{item.userid}</p>

                  <p style={{width:"170px"}} className='orderuserpdqn'>{item.name}</p>
                  <p style={{width:"200px"}} className='orderuserpdprice'>{item.email}</p>
                  <p style={{width:"180px"}} className='orderuserpdprice'>₹{item.total}</p>

                  {/* <p className='orderuserpphno'>{item.productname}</p> */}
                  <div className='orderuserflexicnsss'>
                  <select onChange={(event) => statuschange(event, item.userid,item.orderid)}>
                    <option value={item.status}>{item.status}</option>
                  { item.status=="Cancelled"?"": <option value="Shipped">Shipped</option>}
                  { item.status=="Cancelled"?"": <option value="Delivered">Delivered</option>}
                  </select>
                </div>
                </div>
                <div className='orderdtliccn' onClick={()=>userdeletebtn(item.orderid)}>
<i class="fa-solid fa-trash  fa-xl" style={{position:"absolute"}}></i>
</div>
              </div>
            )
          })
        }
      </div>
      <ToastContainer/>
      <Confirmation conf={conf} onConfirm={handleDeleteConfirmation} onCancel={() => setConf(false)}/>

    </div>
  )
}

export default OrderManagement;
