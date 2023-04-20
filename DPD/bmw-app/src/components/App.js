import React, { useState, useEffect } from 'react';
import GlucoseGraph from './GlucoseGraph';
import AlertsList from './AlertsList';
import { Container, Grid, Box, Typography } from '@mui/material';
import Layout from './Layout';
import Header from './Header';
import InfoCard from './InfoCard';

const App = () => {
  const [glucoseData, setGlucoseData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [patient, setPatient] = useState({});
  const [car, setCar] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientId = 'P1023';
        const glucoseResponse = await fetch(`http://localhost:5000/api/patients/${patientId}/glucose-data`);
        const glucoseData = await glucoseResponse.json();
        setGlucoseData(glucoseData.glucoseData);
        setAlerts(glucoseData.alerts);

        const patientResponse = await fetch('http://localhost:5000/api/patient');
        const patientData = await patientResponse.json();
        setPatient(patientData);

        const carResponse = await fetch('http://localhost:5000/api/car');
        const carData = await carResponse.json();
        setCar(carData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Header />
      <Layout sx={{ backgroundColor: '#FFFFFF' }}>
      <Box sx={{ marginTop: '64px', display: 'flex' }}>
        <Container>
          <Grid container spacing={3} sx={{ marginBottom: (theme) => theme.spacing(4) }}>
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <InfoCard
                title="Glucose Monitoring"
                sx={{ backgroundColor: (theme) => theme.palette.background.lightGrey, color: (theme) => theme.palette.secondary.main, marginBottom: (theme) => theme.spacing(4) }}
              >
                <GlucoseGraph data={glucoseData} />
              </InfoCard>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <InfoCard
                title="Alerts"
                sx={{ backgroundColor: (theme) => theme.palette.background.lightGrey, color: (theme) => theme.palette.secondary.main, marginBottom: (theme) => theme.spacing(4) }}
              >
                <AlertsList alerts={alerts} />
              </InfoCard>
            </Grid>
          </Grid>
            <Grid container spacing={3} sx={{ marginBottom: (theme) => theme.spacing(4) }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InfoCard
                  title="Patient Information"
                  data={[
                    { label: 'Name', value: patient.name },
                    { label: 'Age', value: patient.age },
                    { label: 'Diabetes Type', value: patient.diabetes_type },
                  ]}
                  sx={{ backgroundColor: (theme) => theme.palette.background.lightGrey, color: (theme) => theme.palette.secondary.main }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InfoCard
                  title="Car Information"
                  data={[
                    { label: 'Make', value: car.make },
                    { label: 'Model', value: car.model },
                    { label: 'Year', value: car.year },
                  ]}
                  sx={{ backgroundColor: (theme) => theme.palette.background.lightGrey, color: (theme) => theme.palette.secondary.main }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default App;
