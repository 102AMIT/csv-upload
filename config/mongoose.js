
// basic setup for mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://csv-upload:amit@cluster0.ct2itmr.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error ! connecting to MongoDB ..."));


db.once('open', function(){
    console.log('Connected to MongoDB Database ...');
});


module.exports = db;