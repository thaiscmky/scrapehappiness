global.__basedir = __dirname;
const fontawesome = require('@fortawesome/fontawesome');
const faUser = require('@fortawesome/fontawesome-free-solid/faUser');
const faCircle = require('@fortawesome/fontawesome-free-regular/faCircle');
const faFacebook = require('@fortawesome/fontawesome-free-brands/faFacebook');

fontawesome.library.add(faUser);
fontawesome.library.add(faCircle);
fontawesome.library.add(faFacebook);

const express = require('express');
const app = express();
const path = require('path');
const bodyParser= require("body-parser");
const exphbs = require("express-handlebars");

app.use(express.static('app/public'));

const PORT = process.env.PORT || 3000;

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handelbars
app.engine("handlebars", exphbs({
    defaultLayout:'main'
}));
app.set("view engine",'handlebars');

//routes
let routes = require(path.join(__basedir, '/app/controllers/burger_controller'));
app.use(routes);

//start server
app.listen(PORT,function(){
    console.log("server start " + PORT);
});

