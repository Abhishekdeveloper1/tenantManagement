const multer=require('multer');
const path=require('path');
// const storage=multer.diskStorage(
//     {

//   destination:(req,res,cb)=>{
//     cb(null,'public/uplods');
//   },
//   filename:(req,res,cb)=>{
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
//   });

// const uplodMiddleware=multer({
// storage:storage,
// limits:{fileSize:5*1024*1024}
//   });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the folder where the files will be uploaded
      cb(null, 'public/uploads');  // Adjust the path as needed
    },
    filename: (req, file, cb) => {
      // Ensure file is properly referenced
      cb(null, Date.now() + path.extname(file.originalname)); // This adds a timestamp to the filename to avoid collisions
    }
  });
  
  // Create the upload middleware
//   const uplodMiddleware = multer({ storage: storage });
const uplodMiddleware=multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      // Allow only image files
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimeType && extname) {
        return cb(null, true);  // Accept file
      } else {
        cb(new Error('Only images are allowed'), false);  // Reject file
      }
    }
  });

  const uplodMiddleware_2 = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|pdf/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);  // Accept file
        } else {
            cb(new Error('Only image and PDF files are allowed'), false);  // Reject file
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
}).fields([
    { name: 'idProof', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
]);

module.exports={uplodMiddleware,}