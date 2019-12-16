const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require ('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const {database}= require('./keys');
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
app.use(session({
secret:'nodefavoriteslinks' , 
resave : 'false ', 
saveUninitialized : 'false',
store : new MySqlStore(database)

}));
app.use(flash()); // Usando la dependencia connect-flash para crear mensajes y poder mostrarselo al usuario 
app.use(morgan('dev'))   // Ejecutando el script dev con el modulo morgan para ver todas las transacciones del server
app.use(express.urlencoded({extended:false})) // Aqui le digo a express que que solamente maneje datos sencillos tales como string etc.. no imagenes ni videos
app.use(express.json()); // Le digoa express que podemos manejar Json

//Global Variables
app.use((req,res,next)=>{
    app.locals.success= req.flash ('success'); // Creando el mensaje success global para mi app y asi poder llamarlo desde las vistas 
    next();
})

//Routes 
app.use(require('./routes/'));
app.use(require('./routes/aunthentication'));
app.use('/links',require('./routes/links'));
app.use('/aunthentication',require('./routes/aunthentication'));
//Public 
app.use(express.static(path.join(__dirname,'/public/')));

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
});
