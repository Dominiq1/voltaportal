import React, { useEffect, useState } from 'react';

const LocationButton = () => {
  const [buttonColor, setButtonColor] = useState('red');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    const showPosition = (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const targetLocationLat = 33.9262483;
      const targetLocationLng =  -118.1576938;
      const distance = calculateDistance(userLat, userLng, targetLocationLat, targetLocationLng);

      if (distance <= 10) {
        setButtonColor('blue');
      } else {
        setButtonColor('red');
      }
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d;
    }

    const deg2rad = (deg) => {
      return deg * (Math.PI / 180)
    }

    getLocation();
  }, []);

  return (
    <button style={{ backgroundColor: buttonColor }} onClick={() => alert('Button clicked')}>
      Click Me
    </button>
  );
}

export default LocationButton;
