const multer = require('multer');
const path=require('path')
 const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'public/images'); // Save uploaded files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
  },
});
 
const upload = multer({ storage: storage }); 
module.exports=upload
