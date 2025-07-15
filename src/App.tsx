import React, { useState, useEffect } from 'react';
import './App.css';

// Component imports
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';

// Types and services
import { WeatherData } from './types/weather';
import { weatherService } from './services/weatherService';

// Constants
import { STORAGE_KEYS } from './constants';

/**
 * Main Application component
 * Manages state and coordinates between search and display components
 */
function App() {
  // State management
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load the last searched city from local storage on component mount
  useEffect(() => {
    const lastCity = localStorage.getItem(STORAGE_KEYS.LAST_CITY);
    if (lastCity) {
      setCity(lastCity);
      handleSearch(lastCity);
    }
  }, []);

  /**
   * Handles the weather search process
   * @param searchCity - City name to search for
   */
  const handleSearch = async (searchCity: string) => {
    if (!searchCity.trim()) return;

    setCity(searchCity);
    setIsLoading(true);
    setError(null);

    try {
      // Store the city in local storage before fetching data
      localStorage.setItem(STORAGE_KEYS.LAST_CITY, searchCity);

      const data = await weatherService.fetchWeatherForCity(searchCity);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Render UI elements based on current state
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        {/* Search component */}
        <SearchBar onSearch={handleSearch} />

        {/* Conditional rendering based on state */}
        {isLoading && <p className="status-message">Loading weather data...</p>}
        {error && <p className="error-message">{error}</p>}
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </header>
    </div>
  );
}

export default App;
