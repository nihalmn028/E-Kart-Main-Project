// import React, { useEffect, useState } from 'react'
// import '../All Products/AllProducts.css'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom'
// import axios from '../../Axios/Axios'

// function AllProducts() {
//   const [data, setData] = useState([])
//   const navigate=useNavigate()
//   useEffect(() => {
   
//   // console.log(arr);
  
// axios.get('/productmanagement/allproducts').then((res)=>{
// setData(res.data)
// // console.log(res.data);
// }).catch(()=>{
// console.log("error");
// })

    
//   },[] )
//   function singlepdtclk(data){
//     localStorage.setItem('spid',data)
//     navigate('/singleproduct')
//   }
  
//   return (
//     <div>
//       <div className='mainallprod'>
// <div className='mainallprodflx'>
// {data.map((data,index)=>{
//   return(
//     <div className='mainallprodflxinside' onClick={()=>singlepdtclk(data._id)}>
// <div className='imginsidedivprod'>
// <img key={index} src={'http://localhost:3001/images/'+data.image1} alt="" />
// </div>
// <h4 key={index}>{data.productname}</h4>
// <div className='startgroupsallp'><i class="fa-solid fa-star" style={{ color: "orange" }}></i>
//               <i class="fa-solid fa-star " style={{ color: "orange" }}></i>
//               <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
//               <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
//               <i class="fa-solid fa-star" style={{ color: "orange" }}></i></div>
// <h5 key={index}>{data.price}</h5>

// </div>
//   )
// })}


// </div>
//       </div>
//       <ToastContainer/>
//     </div>
//   )
// }

// export default AllProducts
import React, { useEffect, useState } from 'react';
import '../All Products/AllProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios/Axios';

function AllProducts() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/productmanagement/allproducts')
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  // Logic to get current items based on currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function singlepdtclk(data) {
    localStorage.setItem('spid', data);
    navigate('/singleproduct');
  }

  return (
    <div>
      <div className='mainallprod'>
        <div className='mainallprodflx'>
          {currentItems.map((data, index) => (
            <div className='mainallprodflxinside' onClick={() => singlepdtclk(data._id)} key={index}>
              <div className='imginsidedivprod'>
                <img src={'http://localhost:3001/images/' + data.image1} alt="" />
              </div>
              <h4>{data.productname}</h4>
              <div className='startgroupsallp'>
                <i className="fa-solid fa-star" style={{ color: "orange" }}></i>
                <i className="fa-solid fa-star " style={{ color: "orange" }}></i>
                <i className="fa-solid fa-star" style={{ color: "orange" }}></i>
                <i className="fa-solid fa-star" style={{ color: "orange" }}></i>
                <i className="fa-solid fa-star" style={{ color: "orange" }}></i>
              </div>
              <h5>{data.price}</h5>
              <p className={data.quantity>0 ?"stockavlallp" :"stocknoavlallp" }>{data.quantity>0 ?"In stock" :"Out Of Stock"}</p>

            </div>
          ))}
        </div>
      </div>
      <nav style={{margin:"auto",width:"fit-content"}}>
        <ul className='pagination' >
          <li className='page-item'style={{border:"2px solid orange",color:"black",}}>
            <button onClick={prevPage} className='page-link' style={{color:"black",fontWeight:"bold"}}>Previous</button>
          </li>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
            <li key={i} className='page-item' style={{border:"2px solid orange",color:"black"}}>
              <button onClick={() => paginate(i + 1)} className='page-link' style={{color:"black",fontWeight:"bold"}}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className='page-item' style={{border:"2px solid orange",color:"black",}}>
            <button onClick={nextPage} className='page-link' style={{color:"black",fontWeight:"bold"}}>Next</button>
          </li>
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default AllProducts;
