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
res.send('recibido');
}
);

router.get('/', async(req,res)=>{
  const links =  await db_conecction.query('SELECT * FROM links');
  console.log(links);
  res.render('links/list', {links}); 
})


router.get('/login', (req,res)=>{
  
  
  res.render('links/login'); 
})
module.exports=router ;