function showTime(timestemp) {
  let date = new Date(timestemp);
  console.log(date);
  let hours = date.getHours();
  let dayNum = date.getDate();
  let year = date.getFullYear();

  let minutes = date.getMinutes();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thirsday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let weekday = weekdays[date.getDay()];
  let month = months[date.getMonth()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return ` <br/>Last updated: ${weekday}, ${hours}:${minutes} <br/>  ${month} ${dayNum}, ${year}`;
}

//let currentDate = document.querySelector("#time");
//let currentTime = new Date();
//currentDate.innerHTML = showTime(currentTime);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city").value;
  showWeather(cityInput);
}

function showWeather(cityIn) {
  let apiKey = "87f9bd8acd71337cb736013623f183c8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showGPSTemperature);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);

function findLocation(position) {
  let apiKey1 = "07643e8a095d4ee521877bbfba7e6fb8";

  let units1 = "metric";
  let lat = position.coords.latitude;

  let lon = position.coords.longitude;

  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey1}&units=${units1}`;

  axios.get(apiUrl1).then(showGPSTemperature);
}

let curButton = document.querySelector("#currentButton");
curButton.addEventListener("click", showLocation);

function showLocation() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

function showGPSTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temper").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#city").innerHTML = response.data.name;

  let message = response.data.weather[0].description;
  document.querySelector("#description").innerHTML = message;

  document.querySelector("#time").innerHTML = showTime(response.data.dt * 1000);

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
}

function displayCelsius(event) {
  event.preventDefault();
  document.querySelector("#temper").innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temper").innerHTML = Math.round(
    celsiusTemperature * 1.8 + 32
  );
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let currentCity = "Kyiv";
showWeather(currentCity);
