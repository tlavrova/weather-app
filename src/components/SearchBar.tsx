import React, { useState } from 'react';
import '../styles/SearchBar.css';
import LocationButton from './LocationButton';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest?: () => void; // Optional callback for location button
}

/**
 * Component that handles weather searching by city name
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationRequest }) => {
  const [city, setCity] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
      <div className="search-buttons">
        <button type="submit" className="search-button">
          Get Weather
        </button>
        {onLocationRequest && <LocationButton onLocationRequest={onLocationRequest} />}
      </div>
    </form>
  );
};

export default SearchBar;
