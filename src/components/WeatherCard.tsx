import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  return (
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
  );
};

export default WeatherCard;
