const API_KEY = 'YOUR_API_KEY'; // Please enter your OpenWeatherMap API key here
const LAT = 35.1235; // Busan Nam-gu Uam-dong
const LON = 129.0811;

async function getWeather() {
      try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`);
                const data = await response.json();

          if (data.main) {
                        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}C`;
                        document.getElementById('description').innerText = data.weather[0].description;
                        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
                        document.getElementById('wind-speed').innerText = `${data.wind.speed}m/s`;
          }
      } catch (error) {
                console.error('Error fetching weather:', error);
      }
}

// Demo data if API_KEY is not set
if (API_KEY === 'YOUR_API_KEY') {
      document.getElementById('temperature').innerText = '20C';
      document.getElementById('description').innerText = 'Sunny (Demo)';
      document.getElementById('humidity').innerText = '45%';
      document.getElementById('wind-speed').innerText = '3m/s';
} else {
      getWeather();
}
