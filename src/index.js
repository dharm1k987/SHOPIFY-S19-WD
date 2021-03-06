var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var port = process.env.PORT || 8080;

// singleton database modules
var Datastore = require('nedb');
var db = new Datastore({filename: path.join(__dirname, 'public/db/fav.db'), autoload: true});
module.exports.db = db;

app.use(cors());
app.use(express.static(__dirname + "/public"));

// ejs templates go to view folder
app.set('views', path.join(__dirname, 'public/views'));
app.set('js', path.join(__dirname, 'public/js'));
app.set('css', path.join(__dirname, 'public/css'));
app.set('controllers', path.join(__dirname, '/public/controllers'));
app.set('db', path.join(__dirname, '/public/db'));

var homeController = require(__dirname + "/public/controllers/homeController");
var favouriteController = require(__dirname + "/public/controllers/favouriteController");


// we will use ejs template for the navbar
app.set("view engine", "ejs")

// fire controllers
homeController(app);
favouriteController(app);

console.log("listening on port ...")
app.listen(port);