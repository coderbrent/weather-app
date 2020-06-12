require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = process.env.WEATHER_API_KEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index')
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function(err, response, body) {
    if(err) {
      res.render('index', { 
        weather: null, 
        error: 'Error. Please try again.'
        }
      );
    } 
    else {
      let weather = JSON.parse(body);  
      if(weather.main === undefined) {
        res.render('index', { weather: null, error: 'Error. Please try again.'});
      } 
      else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



