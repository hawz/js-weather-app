'use strict';

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  loadingText.style.display = 'block';
  weatherBox.style.display = 'none';
  var cityName = searchCity.value.trim();
  if (cityName.length === 0) {
    return alert('Please enter a city name');
  }
  var http = new XMLHttpRequest();
  var apiKey = 'db97cf229c4ff3e3dc893924b2465041';
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid='+apiKey;
  var method = 'GET';
  http.open(method, url);

  http.onreadystatechange = function() {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
      weatherData.temperature = data.main.temp;
      console.log(weatherData);
      updateWeather(weatherData);
    } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
      alert('Error: Something went wrong!');
    }
  }
  http.send();
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;
  loadingText.style.display = 'none';
  weatherBox.style.display = 'block';
}