//Week 5 Homework

//👨‍🏫Your task

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
}

//🙀 Bonus point:

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

//Week 4 Homework

//⏰Feature #1

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
console.log(day);

let h6 = document.querySelector("h6");
h6.innerHTML = `${day}, ${hour}:${minutes}`;

//🕵️‍♀️Feature #2
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

//🙀 Bonus feature

function temperatureCelcius(event) {
  let temperature = document.querySelector("#tempday");
  temperature.innerHTML = "14";
}
let celcius = document.querySelector("#celciusTemp");
celcius.addEventListener("click", temperatureCelcius);

function temperatureFarenheit(event) {
  let temperature = document.querySelector("#tempday");
  temperature.innerHTML = "58";
}
let farenheit = document.querySelector("#farenheitTemp");
farenheit.addEventListener("click", temperatureFarenheit);

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
