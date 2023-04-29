// NearestHospital.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CircularProgress, Typography, Box } from '@mui/material';

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
    <Card>
      <CardContent>
        {nearestHospital ? (
          <div>
            <Typography variant="h6" component="div">Nearest Hospital</Typography>
            <Typography>Name: {nearestHospital.name}</Typography>
            <Typography>Address: {nearestHospital.vicinity}</Typography>
          </div>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
            <Typography>Loading nearest hospital...</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default NearestHospital;
