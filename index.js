// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var respone = {};
// your first API endpoint... 
app.get("/api/", function (req, res) {
  respone = {
    unix: Math.floor(new Date().getTime()),
    utc: new Date().toUTCString()
  };
  res.status(200).json(respone);
});

app.get("/api/:data", (req, res) => {
  let { data } = req.params;
  console.log(data);
  let check = new Date(data);
  if(isNaN(check)){
    respone.unix = parseInt(data);
    respone.utc = new Date(parseInt(data)).toUTCString();
  }else {
    respone.unix = Math.floor(new Date(data).getTime());
    respone.utc = new Date(data).toUTCString();
  }
  if(isNaN(respone.unix)){
    res.status(404).json({error: "Invalid Date"});      
  } else res.status(200).json(respone);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
