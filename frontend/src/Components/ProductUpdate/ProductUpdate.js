import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import axios from '../../Axios/Axios';
import '../ProductUpdate/ProductUpdate.css'
function ProductUpdate() {
  const navigate=useNavigate()
  const [previewImages, setPreviewImages] = useState([]);



  const [file, setFile] = useState([])

  const [data, setData] = useState({
    productname:"",
    file:"",
    description:"",
    quantity:"",
    price:"",
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
    const pid=localStorage.getItem('pid');
  
    axios.post('/productmanagement/view',{productid:pid}).then((res)=>{
      
      setInput(res.data)
      // setData(res.data); // Store already uploaded image data
      const imageUrls = [res.data.image1, res.data.image2, res.data.image3].filter(url => url); // Filter out null URLs
      setPreviewImages(imageUrls.map(url => `http://localhost:3001/images/${url}`)); // Construct complete image URLs
      // setData({...data,fullname:res.data.fullname,
      // username:res.data.username,
      // email:res.data.email,
      // phno:res.data.phno})
         })
         .catch(()=>{
      console.log("error");
         })
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

        
  }, [])
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
      else if(input.price<0){
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
      console.log(input.file);
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
      const pid=localStorage.getItem('pid');
      formdata.append('productname',input.productname)
      formdata.append('price',input.price)
      formdata.append('description',input.description)
      formdata.append('quantity',input.quantity)
      formdata.append('category',input.category)
      formdata.append('productid',pid)

      axios.put("/productmanagement/updateproduct",formdata).then((res)=>{
  toast.success("Product Updated Successfully!") 
  setTimeout(() => {
    navigate('/productmanagement')
  
  }, 1200);
  
  }).catch(()=>{
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
// useEffect(() => {
//   // Generate preview images
//   const imagePreviews = file.map(file => URL.createObjectURL(file));
//   setPreviewImages(imagePreviews);

//   // Cleanup function to revoke object URLs when component unmounts or when files change
//   return () => {
//     imagePreviews.forEach(URL.revokeObjectURL);
//   };
// }, [file]);
// const handleFileChange = (event) => {
//   setPreviewImages([]);

//   const selectedFiles = event.target.files;
//   const newFiles = Array.from(selectedFiles);

//   // Check if adding new files will exceed the limit of 3
//   if (file.length + newFiles.length > 3) {
//     toast.error("You can only add 3 images");
//     return;
//   }

//   setFile(prevFiles => [...prevFiles, ...newFiles]); // Append new files to existing files

//   // Generate preview images for new files
//   const newPreviews = newFiles.map(file => URL.createObjectURL(file));

//   // Set new previews alongside existing ones
//   setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviews]);
// };



  return (
    <div>
      <div className='updpdcrmain'>
      <h1 className='updpdcrtitle'>Update Product</h1>
      <div className='updpdcrlabell '>
      <label htmlFor="" className='updpdcrlab'>Product Name</label><br />
<input ref={ref} name='productname' value={input.productname} className='updpdcrninput' type="text" placeholder='Enter Product Name' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.productname}</p>

      </div>
      <div className='updpdcrmgtop'>
      <label className='updpdcrlab' htmlFor="">Product Category</label><br />
{/* <input  name='file' value={input.file} style={{marginTop:"15px"}} type="file" multiple  onChange={handleChange}/> */}
<select ref={ref5}  className='updcategoryprdt' style={{marginTop:"15px"}} name="category" value={input.category} onChange={handleChange} >
  <option value="">Select</option>
  <option value='Mobile'>Mobile</option>
  <option value='Laptop' >Laptop</option>

  <option value='Watch'>Watch</option>

  <option value='Headphone'>Headphone</option>
  <option value='Tablet' >Tablet</option>




</select>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.category}</p>

      </div>
      <div className='updpdcrmgtop'>
      <label className='updpdcrlab' htmlFor="">Product Image</label><br />
<input  style={{marginTop:"15px"}} type="file" multiple  onChange={handleFileChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.file}</p>
<br/>
{previewImages.map((previewUrl, index) => (
    <img key={index} src={previewUrl} alt={`Preview ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '40px' }} />
  ))}

      </div>
      
<div className='updpdcrmgtop'>
      <label className='updpdcrlab ' htmlFor="">Product Price</label><br />
<input id='numberInput1' ref={ref2} name='price' value={input.price} className='updpdcrninput qnnum' type="number" placeholder='Enter Product Price' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.price}</p>


      </div>
      <div className='updpdcrmgtop'>
      <label className='updpdcrlab' htmlFor="">Product Description</label><br />
<input ref={ref3} name='description' value={input.description} className='updpdcrninput' type="text" placeholder='Enter Product Description' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.description}</p>

      </div>
      <div className='updpdcrmgtop'>
      <label className='updpdcrlab ' htmlFor="">Product Quantity</label><br />
<input id='numberInput' ref={ref4} name='quantity' value={input.quantity} className='updpdcrninput qnnum' type="number" placeholder='Enter Product Quantity' onChange={handleChange}/>
<p  style={{color:"red",position:"absolute",top:"85px",fontWeight:"normal"}}>{data.quantity}</p>

      </div>
      
<button  className='updpdcrbtn' onClick={handleClick}>Update</button>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ProductUpdate