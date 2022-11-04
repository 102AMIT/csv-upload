const multer = require('multer');
const path=require('path');
		
// For Multer Storage
var multerStorage = multer.diskStorage({
  // Here we set the destination where our file is displayed 
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname,'..','uploads'));
  },
  // Set the file for Db with current date +File name it's diaplay in our dataBase 
  filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
  }
});

// For Single File upload
var multerSigleUpload = multer({ 
  // here we are store the file in storage with filter the file becasue we only need the csv file and store in fileFilter
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if(ext !== '.csv') {
        
        return cb(new Error('Only CSV File Allowed'));
    }
    // I want next function to validate real ext of files here. 
    cb(null, true);
    
       
    }
});
// upload a sigle file by using single function and pass the filename
module.exports.uploadedCSV = multerSigleUpload.single('filename');