// DOM elements
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const feelsLikeElement = document.querySelector('.feelstemperature');
const windSpeed = document.querySelector('.wind');
const humidityIndex = document.querySelector('.humidity');
const uvIndex = document.querySelector('.uv');
const forecastListElement = document.querySelector('.forecast-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//WeatherAPP API key
const apiKey = '2c1d9347c81f45e889e215656233007';

// Function to display the current weather
function displayCurrentWeather(data) {
    locationElement.textContent = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
    temperatureElement.innerHTML = `<p><strong>Current Temperature:</strong> ${data.current.temp_f}°F</p>`
    descriptionElement.innerHTML = `<p><strong>Description:</strong> ${data.current.condition.text}</p>`
    feelsLikeElement.innerHTML = `<p><strong>Feels Like:</strong> ${data.current.feelslike_f}°F</p>`
    windSpeed.innerHTML = `<p><strong>Wind:</strong> ${data.current.wind_mph} mph</p>`
    humidityIndex.innerHTML = `<p><strong>Humidity:</strong> ${data.current.humidity}</p>`
    uvIndex.innerHTML = `<p><strong>UV:</strong> ${data.current.uv}</p>`
}

// Function to display the 5-day forecast
function displayForecast(forecastData) {
    forecastListElement.innerHTML = ''; // Clear any existing forecast data
  
    forecastData.forecast.forecastday.slice(1, 11).forEach((day) => {
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
      forecastItem.innerHTML = `
        <p><strong>Date:</strong> ${day.date}</p>
        <p><strong>Average Temperature:</strong> ${day.day.avgtemp_f}°F</p>
        <p><strong>Description:</strong> ${day.day.condition.text}</p>
      `;
      forecastListElement.appendChild(forecastItem);
    });
  }

// Function to fetch weather data from WeatherStack API
async function fetchCurrentWeatherData(location) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=2c1d9347c81f45e889e215656233007&q=${location}&days=11&aqi=no&alerts=no`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error.message);
      }
      //Get the current weather
      displayCurrentWeather(data);

      //Get the 10 day forecast
      displayForecast(data);

    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle the error and show a user-friendly message to the user
      locationElement.textContent = 'Error fetching weather data';
      temperatureElement.textContent = '';
      descriptionElement.textContent = '';
    }
  }

// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchCurrentWeatherData(searchTerm);
  }
  displayCurrentWeather();
  displayForecast();
}

// Event listener for the form submission
searchForm.addEventListener('submit', handleFormSubmit);
