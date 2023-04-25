// NearestHospital.js
import React, { useEffect, useState } from 'react';

const NearestHospital = ({ position }) => {
  const [nearestHospital, setNearestHospital] = useState(null);

  useEffect(() => {
    if (position) {
      fetchNearestHospital(position);
    }
  }, [position]);

  const fetchNearestHospital = async (position) => {
    const API_KEY = 'AIzaSyBzHPKcYzqx03ytl08YouIVfM7ZKIuOULw';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.latitude},${position.longitude}&radius=5000&type=hospital&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const nearestHospital = data.results[0];
      setNearestHospital(nearestHospital);
    } catch (error) {
      console.error('Error fetching nearest hospital:', error);
    }
  };

  return (
    <div>
      {nearestHospital ? (
        <div>
          <h3>Nearest Hospital</h3>
          <p>Name: {nearestHospital.name}</p>
          <p>Address: {nearestHospital.vicinity}</p>
        </div>
      ) : (
        <p>Loading nearest hospital...</p>
      )}
    </div>
  );
};

export default NearestHospital;
