function refreshWeather(response) {
  console.log("API Response:", response);

  if (response.data && response.data.list && response.data.list.length > 0) {
    // Assuming the first item in the list contains the current weather data
    let currentWeather = response.data.list[0];

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");

    // Convert temperature from Kelvin to Celsius
    let temperatureCelsius = currentWeather.main.temp - 273.15;

    cityElement.innerHTML = response.data.city.name;
    timeElement.innerHTML = formatDate(new Date(currentWeather.dt * 1000));
    descriptionElement.innerHTML = currentWeather.weather[0].description;
    humidityElement.innerHTML = `${currentWeather.main.humidity}%`;
    windSpeedElement.innerHTML = `${currentWeather.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperatureCelsius);
    iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" class="weather-app-icon" />`;
  } else {
    console.error("Invalid response structure:", response);
    // Handle the case where properties are missing
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7d19e202d7bd4d388ee455df3c1e148f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  axios
    .get(apiUrl)
    .then((response) => {
      console.log("Successful API response:", response);
      if (response.data) {
        console.log("Response data:", response.data);
        refreshWeather(response);
      } else {
        console.error("Invalid response data:", response);
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Initial call with a default city
searchCity("Tehran");
