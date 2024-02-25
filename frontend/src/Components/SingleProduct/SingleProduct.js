import React, { useEffect, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify';

import '../SingleProduct/SingleProduct.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios'
function SingleProduct() {
  const [data, setData] = useState("")
  const [curdata, setCurData] = useState("")
  const [qnt, setQnt] = useState([])
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // const [data1, setData1] = useState({
  //   img1:"",
  //   img2:"",
  //   img3:""
  // })


  useEffect(() => {
    const spid=localStorage.getItem('spid')
   axios.post("/productmanagement/singleproduct",{spid:spid}).then((res)=>{
setData(res.data)
const availableQuantity = res.data.quantity;
const options = [];
for (let i = 1; i <= availableQuantity; i++) {
  options.push(i);
}
setQnt(options)
setCurData(res.data.image1)
console.log(res.data);
   }).catch(()=>{
    console.log("error");
   })
  },[])
//   function hndleload(event){
//     const {src,alt}=event.target
// setData1({...data1,[alt]:src})
//   }
  function changeimg(data){
    setCurData(data)
  }
  function addtocartclick(){
    const userId=localStorage.getItem('userId')
    const spid=localStorage.getItem('spid')

    if(userId){
    axios.post("/cartmanage/addtocart",{userId,spid}).then((res)=>{
      if(res.data.message=="exist")
      return  toast.success("Item already in the cart")

      toast.success("Item added to cart")

    }).catch((error)=>{
      console.log(error);
    })
    }
    else{
      toast.error("Please Login")

    }
  }
  function handleQuantityChange(event) {
    setSelectedQuantity(parseInt(event.target.value)); // Update selected quantity
  }
  return (
    <div>
  
  
      <div className='mainflexsing'>
      <div className='flexcolsin'>
      <div className='imagesinglepr'>
<ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        // isFluidWidth: true,
        isFluidWidth: false, // Change to false to use fixed width
            width: 350, // Specify the desired width
            height: 350, // Specify the desired height
        src: 'http://localhost:3001/images/'+curdata
    },
    largeImage: {
        src: 'http://localhost:3001/images/'+curdata,
        width: 1000,
        height: 1000
    },
    isHintEnabled:true,
    enlargedImageContainerDimensions: { // Inline style to set the width and height of the magnified image container
      width: 600, // Same width as the small image
      height: 500 // Same height as the small image
  }
}} />
      </div>
      <div className='subimgflexrow'>
        <div className='subimgsing' onClick={()=>changeimg(data.image1)}>
        <img src={'http://localhost:3001/images/'+data.image1}  alt="" />
      </div>
      <div className='subimgsing' onClick={()=>changeimg(data.image2)}>
        <img src={'http://localhost:3001/images/'+data.image2} alt="" />
      </div>
      <div className='subimgsing'  onClick={()=>changeimg(data.image3)}>
        <img src={'http://localhost:3001/images/'+data.image3} alt="" />
      </div></div>
      </div>
      <div className='prdctdesnew'>
<h1 >{data.productname}</h1>
<div style={{marginTop:"20px"}}><span style={{marginRight:"10px"}}>4.1</span><i class="fa-solid fa-star" style={{ color: "orange" }}></i>
              <i class="fa-solid fa-star " style={{ color: "orange" }}></i>
              <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
              <i class="fa-solid fa-star" style={{ color: "orange" }}></i>
              <i class="fa-solid fa-star-half-stroke" style={{ color: "orange" }}></i></div>
<h3  style={{marginTop:"30px"}}>₹{data.price* selectedQuantity}</h3>
<h2 style={{marginTop:"40px"}}>Details</h2>
<p  style={{width:"700px"}}>{data.description}</p>
<p className={data.quantity>0 ?"stockavl" :"stocknoavl" }>{data.quantity>0 ?"In stock" :"Out Of Stock"}</p>
{data.quantity>0 ?<div className='qntflexdiv'>
<p className='qntp'>Quantity</p>
<select name="" id="" onChange={handleQuantityChange}>
  { qnt.map((item,index)=>{
    return(
<option key={index} value={item}>{item}</option>
    )
  })
  
  }

</select>
</div>:""}
{data.quantity>0 ?<div className='btnflexsing'><button className='buynowbtnpr'>Buy Now</button><button className='buynowbtnpr'onClick={addtocartclick}>Add To Cart</button></div> :""} 
  </div>
      </div>
    <ToastContainer/>
    </div>
  )
}

export default SingleProduct
// import React, { useEffect, useState } from 'react';
// import ReactImageMagnify from 'react-image-magnify';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from '../../Axios/Axios';
// import '../SingleProduct/SingleProduct.css';

// function SingleProduct() {
//   const [data, setData] = useState("");
//   const [currentImage, setCurrentImage] = useState("");

//   useEffect(() => {
//     const spid = localStorage.getItem('spid');
//     axios.post("/productmanagement/singleproduct", { spid: spid })
//       .then((res) => {
//         setData(res.data);
//         setCurrentImage(res.data.image1); // Set the initial image
//       })
//       .catch(() => {
//         console.log("error");
//       });
//   }, []);

//   function changeImage(imageSrc) {
//     setCurrentImage(imageSrc);
//   }

//   return (
//     <div>
//       <div className='mainflexsing'>
//         <div className='flexcolsin'>
//           <div className='imagesinglepr'>
//             <ReactImageMagnify {...{
//               smallImage: {
//                 alt: 'Wristwatch by Ted Baker London',
//                 isFluidWidth: true,
//                 src: 'http://localhost:3001/images/' + currentImage
//               },
//               largeImage: {
//                 src: 'http://localhost:3001/images/' + currentImage,
//                 width: 1100,
//                 height: 1100
//               },
//               isHintEnabled: true
//             }} />
//           </div>
//           <div className='subimgflexrow'>
//             <div className='subimgsing' onClick={() => changeImage(data.image2)}>
//               <img src={'http://localhost:3001/images/' + data.image2} alt="" />
//             </div>
//             <div className='subimgsing' onClick={() => changeImage(data.image3)}>
//               <img src={'http://localhost:3001/images/' + data.image3} alt="" />
//             </div>
//             <div className='subimgsing' onClick={() => changeImage(data.image4)}>
//               <img src={'http://localhost:3001/images/' + data.image4} alt="" />
//             </div>
//           </div>
//         </div>
//         <div className='prdctdesnew'>
//           <h1>{data.productname}</h1>
//           <div style={{ marginTop: "20px" }}>
//             <span style={{ marginRight: "10px" }}>4.1</span>
//             <i className="fa-solid fa-star" style={{ color: "orange" }}></i>
//             <i className="fa-solid fa-star " style={{ color: "orange" }}></i>
//             <i className="fa-solid fa-star" style={{ color: "orange" }}></i>
//             <i className="fa-solid fa-star" style={{ color: "orange" }}></i>
//             <i className="fa-solid fa-star-half-stroke" style={{ color: "orange" }}></i>
//           </div>
//           <h3 style={{ marginTop: "30px" }}>₹{data.price}</h3>
//           <h2 style={{ marginTop: "40px" }}>Details</h2>
//           <p style={{ width: "700px" }}>{data.description}</p>
//           <div className='btnflexsing'>
//             <button className='buynowbtnpr'>Buy Now</button>
//             <button className='buynowbtnpr'>Add To Cart</button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default SingleProduct;
