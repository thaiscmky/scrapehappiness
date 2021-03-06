global.__basedir = __dirname;
const express = require('express');
const app = express();
const path = require('path');
const bodyParser= require("body-parser");
const exphbs = require("express-handlebars");

app.use(express.static('public'));

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
let Routes = require(path.join(__basedir, 'routes'));
app.use(new Routes(express).getRouter());

//start server
app.listen(PORT,function(){
    console.log("server start " + PORT);
});

