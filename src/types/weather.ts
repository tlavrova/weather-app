// Weather-related type definitions
export interface WeatherData {
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

