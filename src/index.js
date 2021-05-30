// Search Engine

function locationSearch(city) {
  let apiKey = "8f9aad3b8a1db633c9b6d2d3308648b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  console.log("axios");
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let tempDay = document.getElementById("tempDay");
  tempDay.innerHTML = `${temperature}`;
  let pressure = response.data.main.pressure;
  let pre = document.querySelector(".pre");
  pre.innerHTML = `${pressure}km/h`;
  let humidity = response.data.main.humidity;
  let hum = document.querySelector(".hum");
  hum.innerHTML = `${humidity}%`;
  let wind = response.data.wind.speed;
  let win = document.querySelector(".win");
  win.innerHTML = `${wind}km/h`;
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;

  let icon = document.querySelector("#icon-weather");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;

  let date = document.querySelector("#current-date");
  date.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function getLocation(position) {
  let apiKey = "8f9aad3b8a1db633c9b6d2d3308648b9";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
  console.log(apiURL);
}

function goLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let localButton = document.querySelector("#clocation");
localButton.addEventListener("click", goLocation);

function formatDate(timestamp) {
  let date = new Date(timestamp);

  console.log({ date });

  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function enterLocation(event) {
  console.log("enterLocation");
  event.preventDefault();

  console.log("location");
  let location = document.querySelector("#location-input");
  let h2 = document.querySelector("h2");

  h2.innerHTML = location.value;

  locationSearch(location.value);
}

let form = document.querySelector("#enter-submit");
form.addEventListener("click", enterLocation);

//Unit Conversion

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#tempDay");
  let tempC = parseInt(temperature.innerHTML);
  let fahrenheitTempe = (tempC * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTempe);
  fahrenheitShow.classList.add("active");
  celsiusShow.classList.remove("active");
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#tempDay");
  let tempF = parseInt(temperature.innerHTML);
  let celsiusTempe = (tempF - 32) / (9 / 5);
  temperature.innerHTML = Math.round(celsiusTempe);
  fahrenheitShow.classList.remove("active");
  celsiusShow.classList.add("active");
}

let fahrenheitShow = document.querySelector("#fahrenheitTemp");
fahrenheitShow.addEventListener("click", showFahrenheit);

let celsiusShow = document.querySelector("#celsiusTemp");
celsiusShow.addEventListener("click", showCelsius);

//Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  response.data.daily.forEach(function (dayData, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="card border-warning mb-3 card-warning" style="max-width: 20rem;">

          <div class="card-header">
            <strong><em>${formatDay(dayData.dt)}</em></strong>
          </div>

          <div class="card-body text-warning">
            <h5 class="card-city">${dayData.weather[0].description}</h5>
            <p class="card-text">
              <img src="http://openweathermap.org/img/wn/${
                dayData.weather[0].icon
              }@2x.png" alt="City Temperature" class="temperature" />
              <strong>${Math.round(dayData.temp.max)}°C | ${Math.round(
          dayData.temp.min
        )}ºC</strong>
            </p>
          </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;

  console.log(forecastHTML);
}

//API integration

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8f9aad3b8a1db633c9b6d2d3308648b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

getForecast({
  lon: -6.7572,
  lat: 41.8058,
});

enterLocation("Bragança");

/*Week 3 Homework
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

let city = prompt("Enter a city");
city = city.trim();
city = city.toLowerCase();

if (weather[city] !== undefined) {
  let humidity = weather[city].humidity;
  let temp = weather[city].temp;
  let celsiusTemp = Math.round(temp);
  let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);

  alert(
    `It is currently ${celsiusTemp}°C (${fahrenheitTemp}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry we don't know the weather for this city, try going to http://www.google.com/?q=weather+${city}`
  );
}*/
