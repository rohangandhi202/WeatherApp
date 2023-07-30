// DOM elements
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const forecastListElement = document.querySelector('.forecast-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//WeatherAPP API key
const apiKey = '733a414739651ce242b68d4fd47d102a';

// Function to display the current weather
function displayCurrentWeather(data) {
    locationElement.textContent = data.location.name + ', ' + data.location.country;
    // Convert temperature from Celsius to Fahrenheit
    const temperatureInCelsius = data.current.temperature;
    const temperatureInFahrenheit = (temperatureInCelsius * 9) / 5 + 32;
    temperatureElement.textContent = temperatureInFahrenheit.toFixed(1) + '°F';
    descriptionElement.textContent = data.current.weather_descriptions[0];
}

// Function to fetch weather data from WeatherStack API
async function fetchCurrentWeatherData(location) {
    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.success === false) {
        throw new Error(data.error.info);
      }
  
      displayCurrentWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle the error and show a user-friendly message to the user
      locationElement.textContent = 'Error fetching weather data';
      temperatureElement.textContent = '';
      descriptionElement.textContent = '';
    }
  }

// Function to display the 5-day forecast
function displayForecast() {
  forecastListElement.innerHTML = ''; // Clear any existing forecast data

  sampleWeatherData.forecast.forEach((day) => {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <p>${day.date}</p>
      <p>${day.temperature}</p>
      <p>${day.description}</p>
    `;
    forecastListElement.appendChild(forecastItem);
  });
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

// Initial function calls to display sample data
displayCurrentWeather();
displayForecast();
