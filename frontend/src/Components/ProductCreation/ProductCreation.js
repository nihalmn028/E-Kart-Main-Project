import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios from '../../Axios/Axios';
import '../ProductCreation/ProductCreation.css'
function ProductCreation() {
  const navigate=useNavigate()

  const [previewImages, setPreviewImages] = useState([]);

const [file, setFile] = useState([])
  const [data, setData] = useState({
    productname:"",
    description:"",
    quantity:"",
    price:"",
    file:"",
    category:""
  })
  const ref = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  const ref5 = useRef()



  
  const [input, setInput] = useState({
    productname:"",
    description:"",
    quantity:"",
    price:"",
    category:""
  })
  useEffect(() => {
    const numberInput = document.getElementById('numberInput');
    const numberInput1 = document.getElementById('numberInput1');

    if (numberInput || numberInput1) {
      const preventWheel = (e) => e.preventDefault();
      numberInput.addEventListener('wheel', preventWheel, { passive: false });
      numberInput1.addEventListener('wheel', preventWheel, { passive: false });


      return () => {
        numberInput.removeEventListener('wheel', preventWheel);
        numberInput1.removeEventListener('wheel', preventWheel);

      };
    }


  }, []);
  function handleChange(event){
    const {name,value}=event.target
    setInput({...input,[name]:value})


    
    

   
   
  }
  function handleClick(event){
  event.preventDefault()
  
    if(input.productname.trim()===""){
      setData({...data,productname:"Enter the Product Name"})
    ref.current.style.borderBottom= "3px solid red";
    }
    else if(input.category===""){
      setData({...data,category:"Select the Categry"})
      ref5.current.style.border= "3px solid red";

    }
   else if (file.length != 3) {
    setData({...data,file:"Select 3 images"})
    setFile([])

  }
      else if(input.price===""){
        setData({...data,price:"Enter the price"})
        ref2.current.style.borderBottom= "3px solid red";
      }
      else if(input.price<0 ){
        setData({...data,price:"Enter the correct price"})
        ref2.current.style.borderBottom= "3px solid red";
      }
      else if(input.description.trim()===""){
        setData({...data,description:"Enter the description"})
        ref3.current.style.borderBottom= "3px solid red";
      }
      else if(input.quantity===""){
        setData({...data,quantity:"Enter the quantity"})
        ref4.current.style.borderBottom= "3px solid red";
      }
      else if(input.quantity<0){
        setData({...data,quantity:"Enter the correct quantity"})
        ref4.current.style.borderBottom= "3px solid red";
      }
     else{
      setInput({...input,productname:"",description:"",quantity:"",price:"",category:""});
      setFile([])
      setPreviewImages([])
      setData({...data,productname:"",file:"",description:"",quantity:"",price:"",category:""})
      ref.current.style.borderBottom= "2px solid orange";
      ref2.current.style.borderBottom= "2px solid orange";
      ref3.current.style.borderBottom= "2px solid orange";
      ref4.current.style.borderBottom= "2px solid orange";
      ref5.current.style.border= "2px solid orange";

      const formdata = new FormData();
      file.forEach(file => {
          formdata.append('file', file);
      })
      formdata.append('productname',input.productname)
      formdata.append('price',input.price)
      formdata.append('description',input.description)
      formdata.append('quantity',input.quantity)
      formdata.append('category',input.category)

      axios.post("/addproduct",formdata)
      .then((res)=>{
  toast.success("Product Added Successfully!")
  setTimeout(() => {
    navigate('/productmanagement')
  
  }, 1200);
  
  }).catch((err)=>{
    console.log(err);
    toast.error("Product already exist");
  
  })
}
  
 
  
}
const handleFileChange = (event) => {
  const selectedFiles = event.target.files;
  setFile(Array.from(selectedFiles));
 
  // Generate preview images
  const imagePreviews = Array.from(selectedFiles).map(file => URL.createObjectURL(file));
  setPreviewImages(imagePreviews);
};
// Function to handle file selection for preview
// const handleFileChange = (event) => {
//   const selectedFiles = event.target.files;
//   const newFiles = Array.from(selectedFiles);
  
//   // Check if adding new files will exceed the limit of 3
//   if (file.length + newFiles.length > 3) {
//     toast.error("You can only add 3 images");
//     return;
//   }
  
//   setFile(prevFiles => [...prevFiles, ...newFiles]); // Append new files to existing files
  
//   // Generate preview images
//   const imagePreviews = newFiles.map(file => URL.createObjectURL(file));
//   setPreviewImages(prevPreviews => [...prevPreviews, ...imagePreviews]); // Append new previews to existing previews
// };

  
  return (
    <div>
      <div className='pdcrmain'>
      <h1 className='pdcrtitle'>Create Product</h1>
      <div className='pdcrlabell '>
      <label htmlFor="" className='pdcrlab'>Product Name</label><br />
<input ref={ref} name='productname' value={input.productname} className='pdcrninput' type="text" placeholder='Enter Product Name' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.productname}</p>

      </div>
      <div className='pdcrmgtop'>
      <label className='pdcrlab' htmlFor="">Product Category</label><br />
{/* <input  name='file' value={input.file} style={{marginTop:"15px"}} type="file" multiple  onChange={handleChange}/> */}
<select ref={ref5}  className='categoryprdt' style={{marginTop:"15px"}} name="category" value={input.category} onChange={handleChange} >
  <option value="">Select</option>
  <option value='Mobile'>Mobile</option>
  <option value='Laptop' >Laptop</option>

  <option value='Watch'>Watch</option>

  <option value='Headphone'>Headphone</option>
  <option value='Tablet' >Tablet</option>




</select>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.category}</p>

      </div>
      {/* <div className='pdcrmgtop'>
      <label className='pdcrlab' htmlFor="">Product Image</label><br />
<input   style={{marginTop:"15px"}} type="file" multiple  onChange={handleFileChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.file}</p>

      </div> */}
      <div className='pdcrmgtop'>
  <label className='pdcrlab' htmlFor="">Product Image</label><br />
  <input style={{ marginTop: "15px" }} type="file" multiple onChange={handleFileChange} />
  <p style={{ color: "red", position: "absolute", top: "85px", fontWeight: "normal" }}>{data.file}</p>
  {/* Render preview images */} <br />
  {previewImages.map((previewUrl, index) => (
    <img key={index} src={previewUrl} alt={`Preview ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '40px' }} />
  ))}
</div>

      
<div className='pdcrmgtop'>
      <label className='pdcrlab ' htmlFor="">Product Price</label><br />
<input id='numberInput1' ref={ref2} name='price' value={input.price} className='pdcrninput qnnum' type="number" placeholder='Enter Product Price' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.price}</p>


      </div>
      <div className='pdcrmgtop'>
      <label className='pdcrlab' htmlFor="">Product Description</label><br />
<input ref={ref3} name='description' value={input.description} className='pdcrninput' type="text" placeholder='Enter Product Description' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.description}</p>

      </div>
      <div className='pdcrmgtop'>
      <label className='pdcrlab ' htmlFor="">Product Quantity</label><br />
<input id='numberInput' ref={ref4} name='quantity' value={input.quantity} className='pdcrninput qnnum' type="number" placeholder='Enter Product Quantity' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.quantity}</p>

      </div>
      
<button  className='pdcrbtn' onClick={handleClick}>ADD</button>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ProductCreation