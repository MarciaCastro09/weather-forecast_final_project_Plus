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
  tempDay.innerHTML = `${temperature}ºC`;
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

  // Obter o elemento com o id current-date
  let date = document.querySelector("#current-date");

  // Alterar o valor do element current-date <h6> para o resultado da funçao formatDate
  date.innerHTML = formatDate(response.data.dt * 1000);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let logitude = position.coords.longitude;
  let apiKey = "8f9aad3b8a1db633c9b6d2d3308648b9";
  let apIURL = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${logitude}&appid=${apiKey}&units=metric`;
  axios.get(apIURL).then(showTemperature);
  console.log(apIURL);
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

  console.log("Horas: " + hours);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  console.log("Minutes: " + minutes);

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

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTempe = (celsiusTemp * 9) / 5 + 32;
  celsiusShow.classList.remove("active");
  fahrenheitShow.classList.add("active");
  let temperature = document.querySelector("#tempDay");
  temperature.innerHTML = Math.round(fahrenheitTempe);
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#tempDay");
  fahrenheitShow.classList.remove("active");
  celsiusShow.classList.add("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitShow = document.querySelector("#fahrenheitTemp");
fahrenheitShow.addEventListener("click", showFahrenheit);

let celsiusShow = document.querySelector("#celsiusTemp");
celsiusShow.addEventListener("click", showCelsius);

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
