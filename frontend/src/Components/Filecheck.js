// import React, { useState } from 'react'
// import axios from'../Axios/Axios'
// function Filecheck() {
 
//     const [data, setData] = useState()
//     const [data1, setData1] = useState("")

// function btnclk(e){
//   if(data==undefined){
// setData1("enter")
//   }
//   console.log(data);
//   const formdata=new FormData()
//   formdata.append('file',data)
//   console.log(formdata);

//   axios.post('/files',formdata).then((res)=>{
//     console.log(res.data);
//   }).catch((err)=>console.log(err))
// }
//   return (
//     <div>
//       <input type="file"  onChange={(event)=>setData(event.target.files[0])}/>
//       <p>
//         {data1}
//       </p>
//       <button onClick={btnclk}>Upload</button>
//       <img src='http://localhost:3001/images/file_1708237457219.png'></img>
//     </div>
  


//   )
  
// }

// export default Filecheck
import React, { useState } from 'react';
import axios from '../Axios/Axios';

function Filecheck() {
  const [input, setInput] = useState("");

    const [data, setData] = useState([]);
    const [data1, setData1] = useState('');


    function btnclk() {
        if (data.length === 0) {
            setData1('Please select at least one file.');
            return;
        }
        if (data.length === 4) {
          console.log(data);
        const formdata = new FormData();
        data.forEach(file => {
            formdata.append('file', file);
        });
        formdata.append('inputt',input)
        axios.post('/files', formdata)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
          setData([])
      }
        else{
          setData1('Please select max 4 file.');
          setData([])
        }
    }

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={event => setData(Array.from(event.target.files))}
            />
            <input type='text' onChange={(e)=>setInput(e.target.value)}></input>
            <p>{data1}</p>
            <button onClick={btnclk}>Upload</button>
         
        </div>
    );
}

export default Filecheck;
