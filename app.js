const API_KEY = 'YOUR_API_KEY';
const LAT = 35.1235;
const LON = 129.0811;
async function getWeather() {
      try {
                const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`);
                const d = await r.json();
                if (d.main) {
                              document.getElementById('temperature').innerText = `${Math.round(d.main.temp)}C`;
                              document.getElementById('description').innerText = d.weather[0].description;
                              document.getElementById('humidity').innerText = `${d.main.humidity}%`;
                              document.getElementById('wind-speed').innerText = `${d.wind.speed}m/s`;
                }
                const fr = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`);
                const fd = await fr.json();
                if (fd.list) {
                              const container = document.getElementById('forecast');
                              container.innerHTML = '';
                              fd.list.filter((m, i) => i % 8 === 0).slice(0, 5).forEach(day => {
                                                const item = document.createElement('div');
                                                item.className = 'forecast-item';
                                                item.innerHTML = `<span>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</span><span>${Math.round(day.main.temp)}C</span><span>${day.weather[0].description}</span>`;
                                                container.appendChild(item);
                              });
                }
      } catch (e) { console.error(e); }
}
if (API_KEY === 'YOUR_API_KEY') {
      document.getElementById('temperature').innerText = '20C';
      document.getElementById('description').innerText = 'Sunny (Demo)';
      document.getElementById('humidity').innerText = '45%';
      document.getElementById('wind-speed').innerText = '3m/s';
      const container = document.getElementById('forecast');
      container.innerHTML = '';
      ['Mon','Tue','Wed','Thu','Fri'].forEach((d, i) => {
                const item = document.createElement('div');
                item.className = 'forecast-item';
                item.innerHTML = `<span>${d}</span><span>${20+i}C</span><span>Clear</span>`;
                container.appendChild(item);
      });
} else { getWeather(); }
