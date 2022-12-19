/// Date
let today = new Date();
let options = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
let current = new Intl.DateTimeFormat("en-US", options).format(today);
console.log(current);

let currentDate = document.querySelector(".currentDate");
currentDate.innerHTML = current;

///Time
let option = {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};
let time = new Intl.DateTimeFormat("en-US", option).format(today);
console.log(current);
let currentTime = document.querySelector(".currentTime");
currentTime.innerHTML = time;

/// update the name of the city /// weather/////////////////////////////////////////////

function forecast(response) {
  console.log(response.data);
  let forcastElement = document.querySelector(".forcast");
  let day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];

  let forecastHTML = `<div class="row">`;

  day.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
              <ul class="weather">
                <li>${day}</li>
                <li>🌤</li>
                <li>27°C</li>
              </ul>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forcastElement.innerHTML = forecastHTML;
}
forecast();
function getForecast(coordinates) {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);

  axios.get(apiUrl).then(forecast);
}

function showTemp(event) {
  event.preventDefault();
  let cityElement = document.querySelector(".city-name");
  cityElement.innerHTML = document.querySelector(".search-input").value;
  let city = document.querySelector(".search-input").value;
  console.log(city);
  let apikey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  fetch(apiurl)
    .then((response) => response.json())
    .then((data) => {
      tempValue = Math.round(data["main"]["temp"]);
      let temperatureElement = document.querySelector("#temperature");
      temperatureElement.innerHTML = tempValue;
      let descValue = data["weather"][0]["description"];
      let description = document.querySelector(".description");
      description.innerHTML = descValue;
      let iconId = data["weather"][0]["icon"];
      let icon = document.querySelector("#icon");
      icon.setAttribute("src", `http://openweathermap.org/img/w/${iconId}.png`);
      // lat = data["coord"]["lat"];
      // lon = data["coord"]["lon"];
      getForecast(data["coord"]);
    });
}
let form = document.querySelector(".search-box");
form.addEventListener("submit", showTemp);
/////////////////forcast////////////////

///weather

/// change weather
function changeToFahrenheit(event) {
  event.preventDefault();
  cel.classList.remove("active");
  far.classList.add("active");
  let temperature = document.querySelector("#temperature");
  let farTocel = tempValue * (9 / 5) + 32;
  temperature.innerHTML = Math.round(farTocel);
}
function changeToCelsius(event) {
  event.preventDefault();
  far.classList.remove("active");
  cel.classList.add("active");
  let temperature = document.querySelector("#temperature");
  let farTemp = (tempValue - 32) * (5 / 9);
  temperature.innerHTML = tempValue;
}

let cel = document.querySelector(".cel");
cel.addEventListener("click", changeToCelsius);
let far = document.querySelector(".far");
far.addEventListener("click", changeToFahrenheit);
