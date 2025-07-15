import { WeatherData } from '../types/weather';

/**
 * Weather service for handling API interactions with OpenWeatherMap
 */
export const weatherService = {
  /**
   * Fetch weather data for a specific city
   *
   * @param city - The city name to search for
   * @returns Promise with weather data
   */
  async fetchWeatherForCity(city: string): Promise<WeatherData> {
    if (!city.trim()) {
      throw new Error('City name is required');
    }

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    return response.json();
  },

  /**
   * Fetch weather data based on geographic coordinates
   *
   * @param latitude - The latitude coordinate
   * @param longitude - The longitude coordinate
   * @returns Promise with weather data
   */
  async fetchWeatherByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<WeatherData> {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    return response.json();
  },
};
