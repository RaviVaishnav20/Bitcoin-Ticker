//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };


  request(options,function(error, response, body){
    //convert json object to java script object
    var data = JSON.parse(body);
    var currentData = data.time;
    res.write("<p>Current date is: " + currentData +"</p>");
    res.write("<h1>This is the current price of " + amount +" " + crypto +" "+ data.price+" "+fiat+"</h1>");
    res.send();

  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000...");
});
