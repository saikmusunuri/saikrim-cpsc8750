// use the express library
const express = require('express');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
// The main page of our website
// The main page of our website
//app.get('/', (req, res) => {
//  res.send('Hello World!')
//});
app.use(express.static('public'));
app.set('view engine', 'ejs');


/*const {encode} = require('html-entities');
app.get('/', (req, res) => {
const name = req.query.name || "World";
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>An Example Title</title>
        <link rel="stylesheet" href="app.css">
      </head>
      <body>
         <h1>Hello, ${encode(name)}!</h1>
        <p>HTML is so much better than a plain string!</p>
      </body>
    </html>
  `);
});
*/

app.use(cookieParser());
let nextVisitorId = 1;
var msg = "";

app.get('/', (req, res) => {
  var currentTime = req.cookies.visited;
  if(req.cookies['visitorId']){
  res.cookie('visitorId', nextVisitorId);}
  else
  res.cookie('visitorId', nextVisitorId++);
  if(currentTime!=null){
    currentTime = Math.floor((Date.now() - req.cookies.visited) / 1000);
    msg = "It has been ${currentTime} seconds since your last time visit";
  }
  else {
  msg = "You have never visited before."; 
  }
  res.cookie('visited', Date.now());
  res.render('welcome', {
    name: req.query.name || "World",
    datetime: req.query.datetime || new Date().toLocaleString(),
    visitor_count: nextVisitorId,
    msg: msg
  });

  
console.log(req.cookies);
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");
