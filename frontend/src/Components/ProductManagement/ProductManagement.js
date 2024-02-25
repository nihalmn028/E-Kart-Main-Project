import React, { useEffect, useState } from 'react'
import '../ProductManagement/ProductManagement.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Axios/Axios'
import Confirmation from '../Confirmation/Confirmation';
function ProductManagement(props) {
  const [conf, setConf] = useState(false);
  const [SelectedProductId, setSelectedProductId] = useState(null);
  const [data, setData] = useState([])
  const navigate=useNavigate()
  useEffect(() => {
    axios.get('/productmanagement/getproducts').then((res)=>{
    setData(res.data)
    }).catch(()=>{
    console.log("error");
    })
        
      },[])
  function handleclkdlt(data){
    setConf(true)
setSelectedProductId(data);   
    
        }
        function handleDeleteConfirmation() {
          if (SelectedProductId) {
            axios.delete("/productmanagement/deleteproduct/"+SelectedProductId).then((res)=>{
              localStorage.removeItem('pid');
            console.log("success");
            setData(prevData => prevData.filter(user => user._id !== SelectedProductId));
            })  
              .catch(() => {
                // toast.success("error")
      
                console.log("error");
              });
          }
        
          setConf(false); // Hide confirmation dialog
        }

  function btnedit(data){
 
    localStorage.setItem('pid',data)

    navigate('/productupdate');

  }
  function addprdbtn(){
    navigate('/addproduct');
  }
  
  
  return (  
    <div>
<div className={conf?'maindivproductaft':'maindivproduct'}>
<div className='heading'>
{/* <h3 className='headprodpic'>Product</h3> */}

{/* <h3 className='headprodId'>ProductId</h3> */}

<h3 className='headprod'>Name</h3>
{/* <h3 className='headprodCat'>Category</h3> */}

<h3 className='headqua'> Quantity</h3>
<h3 className='headpr'>Price</h3>
<h3 className='headaction'>Action</h3>
<h3 className='addsec' onClick={addprdbtn}>+</h3>


    


</div>
{data.map((data,index)=>{
  return(
<div style={{display:"flex",flexWrap:"wrap",gap:"12px"}}>
<div className='productss' onClick={()=>{
  localStorage.setItem('spid',data._id)
  navigate('/singleproduct')}} >
  {/* <div className='imgdivvprd'><img className='pdimg' src="data:image/jpeg;base64,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" alt="" />
</div> */}
{/* <p className='pdid ' key={index}> {data._id} </p> */}

<p className='pdname'>{data.productname}</p>
<p className='pdqn' >{data.quantity}</p>
<p className='pdprice '> {data.price} </p>




</div>
<div className='flexicnsss'>
<i class="fa-solid fa-pen-to-square fa-xl" onClick={()=>btnedit(data._id)}></i>
<i class="fa-solid fa-trash  fa-xl" onClick={()=>handleclkdlt(data._id)}></i>
</div>
</div>
  )
})}





</div>
<Confirmation conf={conf} onConfirm={handleDeleteConfirmation} onCancel={() => setConf(false)}/>

    </div>
  )
}

export default ProductManagement