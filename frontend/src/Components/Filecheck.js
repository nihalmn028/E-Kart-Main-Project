// // import React, { useState } from 'react'
// // import axios from'../Axios/Axios'
// // function Filecheck() {
 
// //     const [data, setData] = useState()
// //     const [data1, setData1] = useState("")

// // function btnclk(e){
// //   if(data==undefined){
// // setData1("enter")
// //   }
// //   console.log(data);
// //   const formdata=new FormData()
// //   formdata.append('file',data)
// //   console.log(formdata);

// //   axios.post('/files',formdata).then((res)=>{
// //     console.log(res.data);
// //   }).catch((err)=>console.log(err))
// // }
// //   return (
// //     <div>
// //       <input type="file"  onChange={(event)=>setData(event.target.files[0])}/>
// //       <p>
// //         {data1}
// //       </p>
// //       <button onClick={btnclk}>Upload</button>
// //       <img src='http://localhost:3001/images/file_1708237457219.png'></img>
// //     </div>
  


// //   )
  
// // }

// // export default Filecheck
// import React, { useState } from 'react';
// import axios from '../Axios/Axios';

// function Filecheck() {
//   const [input, setInput] = useState("");

//     const [data, setData] = useState([]);
//     const [data1, setData1] = useState('');


//     function btnclk() {
//         if (data.length === 0) {
//             setData1('Please select at least one file.');
//             return;
//         }
//         if (data.length === 4) {
//           console.log(data);
//         const formdata = new FormData();
//         data.forEach(file => {
//             formdata.append('file', file);
//         });
//         formdata.append('inputt',input)
//         axios.post('/files', formdata)
//             .then(res => {
//                 console.log(res.data);
//             })
//             .catch(err => console.log(err));
//           setData([])
//       }
//         else{
//           setData1('Please select max 4 file.');
//           setData([])
//         }
//     }

//     return (
//         <div>
//             <input
//                 type="file"
//                 multiple
//                 onChange={event => setData(Array.from(event.target.files))}
//             />
//             <input type='text' onChange={(e)=>setInput(e.target.value)}></input>
//             <p>{data1}</p>
//             <button onClick={btnclk}>Upload</button>
         
//         </div>
//     );
// }

// export default Filecheck;
import React from 'react'
import { jsPDF } from 'jspdf';
const Filecheck = () => {
    const downloadPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text('Order Details', 20, 10);
    pdf.text('--------------------------', 20, 20);
    pdf.text(`Name:dfdf`, 20, 30);
    pdf.text(`Price: dfdff`, 20, 40);

    // Save the PDF as a file
    pdf.save('order_details.pdf');
  
    }
  return (
    <div>
      <h2>Order Details</h2>
      <p>Name: dfdf</p>
      <p>Price: fdfdf</p>
      <button onClick={downloadPDF}>Download PDF</button>
      </div>
  )
}

export default Filecheck