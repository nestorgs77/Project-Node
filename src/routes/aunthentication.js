const express = require ('express'); 
const router = express.Router();
const db_conecction = require('../database');

 router.get('/signup', (req,res)=>{
     res.render('aunthentication/signup'); 
     });

     router.post('/signup', async(req,res)=>{
         console.log("Llego a la ruta ");
       const {fullname,username,password}= req.body ; 
       const newUser = {
        fullname,
        username,
        password
    }
await db_conecction.query('INSERT INTO users SET ?', [newUser]);
req.flash('success', 'User created suscefully');
res.redirect('aunthentication/signin');
        });

        router.get('/signin', (req,res)=>{
            res.render('aunthentication/signin'); 
            });
module.exports=router ;