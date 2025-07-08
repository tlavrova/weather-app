import React, { useState, useEffect } from 'react';
import './App.css';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  name: string;
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
}

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) return;

    // In a real app, you would store this in an environment variable
    const API_KEY = 'YOUR_API_KEY';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('City not found or API error');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Get Weather
          </button>
        </form>

        {isLoading && <p>Loading weather data...</p>}

        {error && <p className="error-message">{error}</p>}

        {weatherData && (
          <div className="weather-card">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
            </div>
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <p className="weather-description">{weatherData.weather[0].description}</p>
            <div className="weather-details">
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {weatherData.wind.speed} m/s</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
