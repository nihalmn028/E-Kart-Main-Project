const express = require('express');
const router = express.Router();
const multer = require('multer');
const path=require('path')
const imageschema=require('../Models/imageschema')
// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'public/images'); // Save uploaded files to the 'uploads' directory
  },
  filename:  (req, file, cb)=> {
    cb(null, file.fieldname + "_" + Date.now()  + path.extname(file.originalname)) // Use a unique filename
  }
});
 
const upload = multer({ storage: storage }); 

// Define upload route
router.post('/files', upload.array('file',4), (req, res) => { 
console.log(req.files[0].filename)
console.log(req.body.inputt); 
  // req.files.forEach(file => {
  //  console.log();
     
  // });
// imageschema.create({image:req.file.filename})
// res.status(200).json(req.file.filename)
})
  // Check if req.file exists
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // Move the uploaded file to a permanent location
//   fs.rename(req.file.path, 'uploads/' + req.file.filename, (err) => {
//     if (err) {
//       console.error('Error moving file:', err);
//       return res.status(500).send('Error uploading file.');
//     }
//     res.send('File uploaded successfully');
//   });
// });

module.exports = router;
