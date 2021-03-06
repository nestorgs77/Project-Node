const express = require ('express'); 
const router = express.Router();

const db_conecction = require('../database');

 router.get('/add', (req,res)=>{
     res.render('links/add');
 })

router.post('/add', async(req, res)=>
{
const{title,url,description}=req.body
const newLink = {
    title,
    url,
    description
}
await db_conecction.query('INSERT INTO links set ?',[newLink]);
req.flash('success', 'Links saved suscefully');
res.redirect('/links');

}
);

router.get('/delete/:id', async (req,res)=>{
  const{id}= req.params
await db_conecction.query('DELETE FROM links WHERE ID= ?', [id]);
req.flash('success', 'Links removed suscefully');
res.redirect('/links');


});

router.post('/readFiles', (req,res)=>{
res.send('recibido el archivo');

});

router.get('/', async(req,res)=>{
  const links =  await db_conecction.query('SELECT * FROM links');
  res.render('links/list', {links}); 
})


router.get('/login', (req,res)=>{
  
  
  res.render('links/login'); 
})

router.post('/login', (req,res)=>{
  
  
  res.render('links/login'); 
})

router.get('/edit/:id', async(req,res)=>{
const{id}=req.params;
const links =  await db_conecction.query('SELECT * FROM links WHERE id = ? ',[id]);

res.render('links/edit' , {links: links[0]});


});

router.post('/edit/:id', async(req,res)=>{
const {id}= req.params ;
const {title,description,url}= req.body ;
const newLink = {
title,
description,
url
};

await db_conecction.query('UPDATE links set ? WHERE id = ?',[newLink ,id]); 
req.flash('success', 'Links Updated') ;
res.redirect('/links');

});

module.exports=router ;