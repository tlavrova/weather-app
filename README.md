# Weather App

A modern, responsive React weather application that allows users to search for weather conditions by city name or use their current location to get local weather information.

![Weather App Screenshot](public/app-screenshot.png)

## Features

- **City Search**: Look up current weather conditions for any city worldwide
- **Geolocation**: Get weather for your current location with one click
- **Persistent Storage**: Remembers your last searched city
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Detailed Weather Info**: View temperature, humidity, wind speed, and pressure

## Tech Stack

- React 18
- TypeScript
- OpenWeatherMap API
- CSS3 with CSS Variables
- Geolocation API
- Local Storage

## Project Structure

The project follows a modular component-based architecture:

```
src/
  ├── components/       # React components
  ├── services/         # API services
  ├── styles/           # Component-specific CSS
  ├── types/            # TypeScript interfaces
  └── constants/        # Application constants
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

## API Usage

This app uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You'll need to:

1. Sign up for a free API key at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
2. Add the key to your `.env` file as described above
3. Note that new API keys may take a few hours to activate

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Project bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
