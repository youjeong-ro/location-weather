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

              getForecast();
          } catch (error) {
                        console.error('Error fetching weather:', error);
          }
}

async function getForecast() {
          try {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`);
                        const data = await response.json();

              if (data.list) {
                                const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
                                displayForecast(dailyData);
              }
          } catch (error) {
                        console.error('Error fetching forecast:', error);
          }
}

function displayForecast(forecastData) {
          const forecastContainer = document.getElementById('forecast');
          forecastContainer.innerHTML = '';

    forecastData.forEach(day => {
                  const date = new Date(day.dt * 1000);
                  const dayName = date.toLocaleDateString('ko-KR', { weekday: 'short' });

                                 const item = document.createElement('div');
                  item.className = 'forecast-item';
                  item.innerHTML = `
                              <span>${dayName}</span>
                                          <span>${Math.round(day.main.temp)}C</span>
                                                      <span>${day.weather[0].description}</span>
                                                              `;
                  forecastContainer.appendChild(item);
    });
}

if (API_KEY === 'YOUR_API_KEY') {
          document.getElementById('temperature').innerText = '20C';
          document.getElementById('description').innerText = 'Sunny (Demo)';
          document.getElementById('humidity').innerText = '45%';
          document.getElementById('wind-speed').innerText = '3m/s';

    const demoForecast = [
          { dt: Date.now()/1000 + 86400, main: { temp: 21 }, weather: [{ description: 'Clear sky' }] },
          { dt: Date.now()/1000 + 172800, main: { temp: 19 }, weather: [{ description: 'Few clouds' }] },
          { dt: Date.now()/1000 + 259200, main: { temp: 22 }, weather: [{ description: 'Scattered clouds' }] },
          { dt: Date.now()/1000 + 345600, main: { temp: 18 }, weather: [{ description: 'Rain' }] },
          { dt: Date.now()/1000 + 432000, main: { temp: 20 }, weather: [{ description: 'Cloudy' }] }
              ];
          displayForecast(demoForecast);
} else {
          getWeather();
}
