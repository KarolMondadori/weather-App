function formatDate (timestamp) {
    let date = new Date(timestamp);
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return `📅 ${day} ${formatHours(timestamp)}`;
  }
   
  function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
       if (hours < 10) {
         hours = `0${hours}`;
  }
    let minutes = date.getMinutes();
       if (minutes < 10) {
         minutes = `0${minutes}`;
  }
  
    return `${hours}:${minutes}`;
   }
  
   function displayTemperature(response) {
    let temperatureElement = document.querySelector("h5");
    let cityElement = document.querySelector("h1");
    let descriptionElement = document.querySelector("h3");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("h2");
    let iconElement = document.querySelector("#icon");
  
    celsiusTemperature = (response.data.main.temp);
  
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = `〰️ ${response.data.weather[0].description}`;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = ` ${Math.round(response.data.wind.speed)} km/h`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt",response.data.weather[0].description);
  }
  
  function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
      <div class="col-2">
       <h4>
         ${formatHours(forecast.dt * 1000)}
       </h4>
       <img
         src="http://openweathermap.org/img/wn/${
         forecast.weather[0].icon
        }@2x.png" 
       />
       <div class="weather-forecast-temperature">
       <strong>
         ${Math.round(forecast.main.temp_max)}°
       </strong> 
         ${Math.round(forecast.main.temp_min)}°
       </div>
      </div>
      `;
    }  
  }
  
  function searchCity(city) {
    let apiKey = "cb93351fdb5c829680012a4abc8e7ad3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  
    apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#enterCity");
    searchCity(cityInputElement.value);
  }
  
  function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector ("h5");
  
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function displayCelsiusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("h5");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusTemperature = null;
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemp);
  
  searchCity("New York");