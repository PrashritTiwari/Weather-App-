document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeather(location);
    }
});

document.getElementById('geo-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, () => {
            displayError('Unable to retrieve your location.');
        });
    } else {
        displayError('Geolocation is not supported by this browser.');
    }
});

function fetchWeather(location) {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError('Location not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            displayError('An error occurred while fetching the weather data.');
        });
}

function fetchWeatherByCoords(lat, lon) {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError('Unable to get weather data for your location.');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            displayError('An error occurred while fetching the weather data.');
        });
}

function displayWeather(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('weather-info').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('weather-info').style.display = 'none';
}