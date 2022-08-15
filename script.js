function showTime(timestemp) {
  let date = new Date(timestemp);

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thi", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
            <div class="col-6 futur">
              <ul>
                <li>
                    <div class="wheather-forecast-temperature">
                      <span class="wheather-forecast-temperature-max" id="tempmax">${Math.round(
                        forecastDay.temp.max
                      )}°</span> <span class="wheather-forecast-temperature-min" id="tempmin">${Math.round(
          forecastDay.temp.min
        )}°</span>
                      
                    </div>
                </li>
                <li>
                    <span class="forprecip" id="forprecip">${
                      forecastDay.humidity
                    }</span><span class="un"> %</span>
                </li>
                <li>
                  <span class="forwind" id="forwind">${Math.round(
                    forecastDay.wind_speed
                  )}</span><span class="un"> km/h</span>
                </li>
              </ul>
            </div>
            <div class="col-4">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt=""  id="iconfor"width="42"/> 
            </div>
            <div class="col-2 day">${formatDay(forecastDay.dt)}</div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

function getForecast(coordinates) {
  let apiKey1 = "07643e8a095d4ee521877bbfba7e6fb8";

  let units1 = "metric";
  let lat = coordinates.lat;

  let lon = coordinates.lon;

  let apiUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey1}&units=${units1}`;

  axios.get(apiUrl1).then(displayForecast);
}

function showGPSTemperature(response) {
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
  getForecast(response.data.coord);
}

let currentCity = "Kyiv";
showWeather(currentCity);
