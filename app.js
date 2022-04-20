const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function() {
    console.log("Sever started on port 3000.");
})

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html");

})

app.post("/", function (req, res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "390e3e00a059a4ec5c4b3c5708ba1189";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon =weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently "+weatherDesc+"</p>");
            res.write("<p><h1>The temperature in "+query+" is currently "+temp+" degree Celsius</h1></p>");
            res.write("<img src = "+imageURL+">");
            res.send();

        })
    });
})

