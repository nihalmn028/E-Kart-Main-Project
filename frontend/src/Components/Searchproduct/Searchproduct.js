import React, { useEffect, useState } from 'react'
import '../Searchproduct/Searchproduct.css'
import { useNavigate } from 'react-router-dom'
import axios from '../../Axios/Axios'
function Searchproduct() {
  const [data, setData] = useState([])


  const navigate=useNavigate()
  useEffect(() => {
    const search=localStorage.getItem('search')
    const search1=localStorage.getItem('search1')

      axios.post('/productmanagement/search' ,{key1:search, key2:search1})
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setData([]);
        });
    
  // console.log(arr);


   
   
// axios.get('/productmanagement/allproducts').then((res)=>{
// setData(res.data)
// // console.log(res.data);
// }).catch(()=>{
// console.log("error");
// })

    
  },[data])
  function singlepdtclk(data){
    localStorage.setItem('spid',data)
    navigate('/singleproduct')
  }
  return (
    <div>
           <div className='secondmainsearch'>
      <div className='mainallprodsearch'>
        {
          data.length === 0 ? <h2>No product found</h2>:
          <div className='mainallprodflxsearch'>
  
          {data.map((data,index)=>{
      return(
        <div className='mainallprodflxinsidesearch' onClick={()=>singlepdtclk(data._id)}>
    <div className='imginsidedivprodsearch'>
    <img key={index} src={'http://localhost:3001/images/'+data.image1} alt="" />
    </div>
    <h4 key={index}>{data.productname}</h4>
    <div className='startgroupsallpsearch'><i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                  <i class="fa-solid fa-star " style={{ color: "orange" }}></i>
                  <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                  <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
                  <i class="fa-solid fa-star" style={{ color: "orange" }}></i></div>
    <h5 key={index}>{data.price}</h5>
    
    </div>
      )
    })}
     </div> 
        }
         <p className='allprodutbtnsearch' style={{fontSize:"22px",marginTop:"40px",color:"orange"}} onClick={()=>navigate('/allproducts')} >All products{" >>>"}</p>


</div>
</div>
    </div>
  )
}

export default Searchproduct