// DOM elements
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const forecastListElement = document.querySelector('.forecast-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Sample weather data for testing (replace this with actual data from the API)
const sampleWeatherData = {
  location: 'Chicago, USA',
  temperature: '85°F',
  description: 'Sunny',
  forecast: [
    { date: '2023-07-31', temperature: '88°F', description: 'Partly Cloudy' },
    { date: '2023-08-01', temperature: '94°F', description: 'Sunny' },
    { date: '2023-08-02', temperature: '85°F', description: 'Cloudy' },
    { date: '2023-08-03', temperature: '93°F', description: 'Sunny' },
    { date: '2023-08-04', temperature: '100°F', description: 'Clear' },
  ],
};

// Function to display the current weather
function displayCurrentWeather() {
  locationElement.textContent = sampleWeatherData.location;
  temperatureElement.textContent = sampleWeatherData.temperature;
  descriptionElement.textContent = sampleWeatherData.description;
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
  const searchTerm = searchInput.value;
  // Implement code to fetch weather data for the entered location from the API here
  // and update the sampleWeatherData object with the actual data received from the API.
  // Then call the displayCurrentWeather() and displayForecast() functions to show the updated data.
  // For now, we'll use the sampleWeatherData for testing purposes.
  displayCurrentWeather();
  displayForecast();
}

// Event listener for the form submission
searchForm.addEventListener('submit', handleFormSubmit);

// Initial function calls to display sample data
displayCurrentWeather();
displayForecast();
