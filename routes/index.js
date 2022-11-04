const express=require('express');
const router=express.Router();
const home=require('../controllers/home');
const csv=require('../controllers/csv');


// for home page
router.get('/',home.homePage);
// for read CSV
router.get('/:id/read',csv.readCsv);
// For Create CSV
router.post('/upload/csv',csv.create);

// For delete Csv File

router.get('/:id/delete',csv.delete);

module.exports=router;