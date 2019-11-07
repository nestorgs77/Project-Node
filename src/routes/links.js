const express = require ('express'); 
const router = express.Router();
const db_conecction = require('../database');

 router.get('/add', (req,res)=>{
     res.render('links/add');
 })


module.exports=router ;