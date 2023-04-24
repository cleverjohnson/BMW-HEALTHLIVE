import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import Layout from './Layout';
import Header from './Header';
import InfoCard from './InfoCard';
import GlucoseMonitor from './GlucoseMonitor';
import GlucoseDataTable from './GlucoseDataTable';
import AlertsList from './AlertsList';

const App = () => {
  const [glucoseData, setGlucoseData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [patient, setPatient] = useState({});
  const [car, setCar] = useState({});

  useEffect(() => {
    const patientId = 'P1023';
    const fetchData = async () => {
      try {
        const glucoseResponse = await fetch(`http://localhost:5000/api/patients/${patientId}/glucose-data`);
        const glucoseData = await glucoseResponse.json();
        setGlucoseData(glucoseData.glucoseData);
        setAlerts(glucoseData.alerts);
  
        const patientResponse = await fetch(`http://localhost:5000/api/patient/${patientId}`);
        const patientData = await patientResponse.json();
        setPatient(patientData);
  
        const carResponse = await fetch(`http://localhost:5000/api/car/${patientId}`);
        const carData = await carResponse.json();
        setCar(carData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Fetch the initial data
    const interval = setInterval(fetchData, 10000); // Fetch the data every 10 seconds (10000 ms)
  
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);  

  console.log('glucoseData:', glucoseData);
  console.log('alerts:', alerts);
  console.log('patient:', patient);
  console.log('car:', car);

  return (
    <>
      <Header />
      <Layout sx={{ backgroundColor: '#FFFFFF' }}>
      <Box sx={{ marginTop: '64px', display: 'flex' }}>
        <Container>
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
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <GlucoseMonitor glucoseData={glucoseData} alerts={alerts} />
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default App;
