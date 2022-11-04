const mongoose=require('mongoose');

// Schema of the object 
const csvSchema=new mongoose.Schema({
    file_name:{
        type: String
    }
});


const FileCsv = mongoose.model('CSV-Upload', csvSchema);
module.exports = FileCsv;