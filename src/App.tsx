import React, { useState, useEffect } from 'react';
import './styles/App.css';

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
  const [isGeolocating, setIsGeolocating] = useState<boolean>(false);

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

  /**
   * Get the user's current position using the Geolocation API
   * @returns Promise with GeolocationPosition
   */
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };

  /**
   * Handle geolocation-specific errors with user-friendly messages
   * @param error - The error that occurred during geolocation
   */
  const handleGeolocationError = (error: unknown): string => {
    console.error('Geolocation error:', error);

    if (error instanceof GeolocationPositionError) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          return "You denied the request for geolocation";
        case error.POSITION_UNAVAILABLE:
          return "Location information is unavailable";
        case error.TIMEOUT:
          return "The request to get user location timed out";
        default:
          return "An unknown error occurred while getting location";
      }
    }

    return error instanceof Error ? error.message : "Failed to get weather for your location";
  };

  /**
   * Handles getting weather data based on the user's current location
   */
  const handleLocationRequest = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsGeolocating(true);
    setError(null);

    try {
      // Get current position coordinates
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      // Fetch weather data using coordinates
      setIsLoading(true);
      const data = await weatherService.fetchWeatherByCoordinates(latitude, longitude);

      // Update city name and store in local storage
      if (data.name) {
        setCity(data.name);
        localStorage.setItem(STORAGE_KEYS.LAST_CITY, data.name);
      }

      setWeatherData(data);
    } catch (error) {
      const errorMessage = handleGeolocationError(error);
      setError(errorMessage);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
      setIsGeolocating(false);
    }
  };

  // Render UI elements based on current state
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        {/* Search component */}
        <SearchBar onSearch={handleSearch} onLocationRequest={handleLocationRequest} />

        {/* Conditional rendering based on state */}
        {isGeolocating && <p className="status-message">Getting your location...</p>}
        {isLoading && <p className="status-message">Loading weather data...</p>}
        {error && <p className="error-message">{error}</p>}
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </header>
    </div>
  );
}

export default App;
