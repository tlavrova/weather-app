import React from 'react';

interface LocationButtonProps {
  onLocationRequest: () => void;
}

/**
 * Component for the "My Location" button that gets the user's current location
 */
const LocationButton: React.FC<LocationButtonProps> = ({ onLocationRequest }) => {
  return (
    <button
      type="button"
      className="location-button"
      onClick={onLocationRequest}
      title="Get weather for your current location"
    >
      📍 My Location
    </button>
  );
};

export default LocationButton;
