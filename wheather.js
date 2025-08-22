function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "f930722beaf0d49af73aeb271d6ae6ba";
    const weatherDiv = document.getElementById("weatherInfo");
  
    if (!city) {
      weatherDiv.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
      return;
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    weatherDiv.innerHTML = "<p>Loading weather...</p>";
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found. Please try again.");
        }
        return response.json();
      })
      .then(data => {
        const weather = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
          <p><strong>Condition:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
        weatherDiv.innerHTML = weather;
      })
      .catch(error => {
        weatherDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  }
  