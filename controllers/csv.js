const csvpparser=require('csv-parser');
const csvSchema=require('../models/csv');
const csvmulter=require('../config/multer');
const fs = require('fs');
const path = require('path');

// Create the file and store in Database 
module.exports.create = function (req, res) {
  
  try{
// are we are using uploadedCSV for single file upload
    csvmulter.uploadedCSV(req, res, function(err){
      
      if(err){
        console.log('Error ! In Multer ...', err)
        return res.send(`<h3>Not a csv File! please go back and  select a csv file then upload</h3>`);
      }
      if(req.file){
        // create and Store the file in dataBase 
        csvSchema.create({file_name: req.file.filename});
      }

      return res.redirect('back');
  });

  }catch(err){
      console.log("Error ! ...",err);
      return res.redirect('back');
  }

}

// implement the readCsv  file 
module.exports.readCsv=function(req,res){
  // creating a array for sotring the data 
    const results = [];
    // finding the data in csvSchema means Data Base 
    csvSchema.findById(req.params.id,function(err,docs){

      if(err){
        console.log("Error ! ....",err);
        return;
      }
      // here we are joining the path and store in coolPath
      // we are using path.join for resolving absolute path  means return absolute path
      const coolPath = path.join(__dirname ,'..' ,'/uploads/'+docs.file_name);

      // here we are reading the file 
      // here we are reading the Stream the use pipe csvpparser for passing the data as csv and getting the string object  and then  push into the array 
      fs.createReadStream(coolPath).pipe(csvpparser()).on('data', (data) => results.push(data)).on('end', () => {
        // getting the result object
        // console.log(results);
        res.render('table',{
          // set the 1st row in header
            headers: Object.keys(results[0]),
          // remaining data set in data
            data: results
        });
    });

  });
    
}


// delete csv file

module.exports.delete= async function(req,res){
  const file=await csvSchema.findByIdAndDelete(req.params.id);
  
    if(file){
      return res.redirect('back')
    }else{
      console.log("error in deleting file from database");
      
    }
}