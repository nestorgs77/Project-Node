const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require ('path');
//initializations
const app = express();

//settings
app.set('port', process.env.PORT ||4000) ;
app.set ('views',path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    // Aqui configuro el motor handlebar
defaultLayout : 'main', //Defino que lo que esta en la clase main.hbs va a ser el defaultlayout para todas mis vistas
layoutsDir:path.join(app.get('views'),'layouts'), //Defino en layoutsDir la ruta y la concateno y quedaria /views/layouts
partialsDir: path.join(app.get('views'),'partials'),//Defino dentro de partialsDir la ruta de la carpeta Partial adentro de Views
extname:'.hbs', // Le defino al motor de handlebar que la extensiones seran .hbs
helpers:require('./lib/handlebars')
}));
app.set ('view engine', '.hbs'); //Activando el motor de plantillas handlebars y le paso el nombre del motor .hbs

//Midelware
app.use(morgan('dev'))   // Ejecutando el script dev con el modulo morgan para ver todas las transacciones del server
app.use(express.urlencoded({extended:false})) // Aqui le digo a express que que solamente maneje datos sencillos tales como string etc.. no imagenes ni videos
app.use(express.json()); // Le digoa express que podemos manejar Json
//Global Variables
app.use((req,res,next)=>{
    next();
})

//Routes 
app.use(require('./routes/'));
app.use(require('./routes/aunthentication'));
app.use('/links',require('./routes/links'));

//Public 
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
});
