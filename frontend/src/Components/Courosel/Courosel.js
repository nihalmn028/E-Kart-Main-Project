import React, { useEffect, useState } from 'react'
import bannerhome from '../Home/homeImages/bannerhome.avif'

import { Carousel } from 'react-bootstrap';
import axios from '../../Axios/Axios';
import { useNavigate } from 'react-router-dom';
function Courosel() {
  const navigate=useNavigate()
  const [data, setData] = useState([])
 useEffect(() => {
  axios.get('/productmanagement/getproductavailable').then((res)=>{
    // const rev=res.data.reverse()
setData(res.data)
  }).catch((err)=>{
    console.log(err);
  })
 }, [])
 

  return (
    <div>
        <Carousel  interval={1500} style={{zIndex:"1"}}>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          src={bannerhome}
          alt="First slide"
          style={{height:"500px"}}
        />
       
      </Carousel.Item>
      {
      data.map((data,index)=>{
    
        return(
        
      <Carousel.Item  key={index} onClick={() => {
        localStorage.setItem('spid',data._id)
        navigate('/singleproduct')}}>
   
          <img   
          className="d-block w-100"
          src={'http://localhost:3001/images/' + data.image1}
          alt="Second slide"
          style={{height:"500px"}}
        />
 
      
      </Carousel.Item>
             )
            })
        }
      {/* Add more Carousel.Items for additional slides */}
    </Carousel>
    </div>
  )
}

export default Courosel