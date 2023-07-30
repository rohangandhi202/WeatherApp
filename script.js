// DOM elements
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const forecastListElement = document.querySelector('.forecast-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//WeatherAPP API key
const apiKey = '2c1d9347c81f45e889e215656233007';

// Function to display the current weather
function displayCurrentWeather(data) {
    locationElement.textContent = data.location.name + ', ' + data.location.country;
    temperatureElement.textContent = data.current.temp_f + '°F';
    descriptionElement.textContent = data.current.condition.text;
}

// Function to display the 5-day forecast
// function displayForecast(forecastData) {
//     forecastListElement.innerHTML = ''; // Clear any existing forecast data
  
//     forecastData.forEach((day) => {
//         const forecastItem = document.createElement('div');
//         forecastItem.classList.add('forecast-item');
//         forecastItem.innerHTML = `
//             <p>Date: ${day.date}</p>
//             <p>Temperature: ${day.day.avgtemp_f}°C</p>
//             <p>Description: ${day.day.condition.text}</p>
//         `;
//     forecastListElement.appendChild(forecastItem);
//   });
//   }

// Function to fetch weather data from WeatherStack API
async function fetchCurrentWeatherData(location) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=2c1d9347c81f45e889e215656233007&q=${location}&days=10&aqi=no&alerts=no`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error.message);
      }
      //Get the current weather
      displayCurrentWeather(data);

      //Get the 10 day forecast
    //   displayForecast(data);

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
