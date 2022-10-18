// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:data", (req, res) => {
  const { data } = req.params;
  let respone = {unix: 0, utc: ""};
  if(data.indexOf("-") === -1){
    respone.utc = new Date(parseInt(data)).toUTCString();
    respone.unix = parseInt(data);
  }else {
    respone.unix = Math.floor(new Date(data).getTime());
    respone.utc = new Date(data).toUTCString();
  }
  res.json(respone);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
