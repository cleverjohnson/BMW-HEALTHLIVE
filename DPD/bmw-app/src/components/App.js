import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Snackbar, Alert as MuiAlert } from '@mui/material';
import { styled } from '@mui/system';
import Layout from './Layout';
import Header from './Header';
import InfoCard from './InfoCard';
import GlucoseMonitor from './GlucoseMonitor';
import NearestHospital from './NearestHospital';
import GlucoseValue from './GlucoseValue';
import { Route, Routes } from 'react-router-dom';
import Reminders from './features/reminders/Reminders';

const CRITICAL_THRESHOLD = 200; // Set the threshold value

const App = () => {
  const [glucoseData, setGlucoseData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [patient, setPatient] = useState({});
  const [car, setCar] = useState({});
  const [safetyActions, setSafetyActions] = useState([]);
  const [position, setPosition] = useState(null);
  const [showNearestHospital, setShowNearestHospital] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dataStartIndex, setDataStartIndex] = useState(0);
  const [dataEndIndex, setDataEndIndex] = useState(10);

  const StyledContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  }));

  useEffect(() => {
    const patientId = 'P1023';
    const fetchData = async () => {
      try {
        const glucoseResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/patients/${patientId}/glucose-data`);
        const glucoseData = await glucoseResponse.json();
        setGlucoseData(glucoseData.glucoseData);
        setAlerts(glucoseData.alerts);
        setSafetyActions(glucoseData.safety_actions);
  
        const patientResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/${patientId}`);
        const patientData = await patientResponse.json();
        setPatient(patientData);
  
        const carResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/car/${patientId}`);
        const carData = await carResponse.json();
        setCar(carData);

        if (dataEndIndex >= glucoseData.glucoseData.length) {
          setDataStartIndex(0);
          setDataEndIndex(10);
        } else {
          setDataStartIndex((prevIndex) => prevIndex + 10);
          setDataEndIndex((prevIndex) => prevIndex + 10);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Fetch the initial data
    const interval = setInterval(fetchData, 10000); // Fetch the data every 10 seconds (10000 ms)
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [dataEndIndex]);  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error('Error getting user location:', error)
    );
  }, []);

  useEffect(() => {
    if (glucoseData.some((data) => data.glucose_level >= CRITICAL_THRESHOLD)) {
      setShowNearestHospital(true);
    } else {
      setShowNearestHospital(false);
    }
  }, [glucoseData]);

    // Effect to handle safety action notifications
    useEffect(() => {
      if (safetyActions.length > 0) {
        const lastSafetyAction = safetyActions[safetyActions.length - 1];
        setSnackbarMessage(`Safety Action: ${lastSafetyAction.action}`);
        setSnackbarOpen(true);
      }
    }, [safetyActions]);
  
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

  console.log('glucoseData:', glucoseData);
  console.log('alerts:', alerts);
  console.log('patient:', patient);
  console.log('car:', car);

  return (
    <>
      <Header />
      <Layout sx={{ backgroundColor: '#FFFFFF' }}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Box sx={{ marginTop: '64px', display: 'flex' }}>
                  <StyledContainer>
                    <Grid container spacing={1} sx={{ marginBottom: (theme) => theme.spacing(4) }}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                      <InfoCard
                        title="Patient & Car Information"
                        data={[
                          { label: 'Name', value: patient.name },
                          { label: 'Age', value: patient.age },
                          { label: 'Diabetes Type', value: patient.diabetes_type },
                        ]}
                        data2={[
                          { label: 'Make', value: car.make },
                          { label: 'Model', value: car.model },
                          { label: 'Year', value: car.year },
                        ]}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <GlucoseValue glucoseData={glucoseData} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <GlucoseMonitor glucoseData={glucoseData} alerts={alerts} safetyActions={safetyActions} dataStartIndex={dataStartIndex} dataEndIndex={dataEndIndex} />
                      {showNearestHospital && position && <NearestHospital position={position} />}
                    </Grid>
                  </StyledContainer>
                </Box>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackbar}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                  }}
                >
                  <MuiAlert onClose={handleCloseSnackbar} severity="info" elevation={6} variant="filled" sx={{ backgroundColor: '#0066B2' }}>
                    {snackbarMessage}
                  </MuiAlert>
                </Snackbar>
              </>
            }
          />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </Layout>
    </>
  );  
};

export default App;
