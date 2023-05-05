import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const GlucoseValueContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '12px',
  padding: '1rem',
  marginTop: '1rem',
}));

const GlucoseValue = ({ glucoseData }) => {
  const latestGlucose = glucoseData.length > 0 ? glucoseData[glucoseData.length - 1] : null;
  const latestGlucoseValue = latestGlucose ? latestGlucose.glucose_level : 'N/A';
  const latestGlucoseTimestamp = latestGlucose ? new Date(latestGlucose.timestamp).toLocaleString() : 'N/A';

  return (
    <GlucoseValueContainer>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontSize: '2rem', lineHeight: '2rem' }}>
          {latestGlucoseValue}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'light', fontSize: '1rem', lineHeight: '2rem' }}>
          {' mg/dL'}
        </Typography>
      </Box>
      <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'light', fontSize: '1rem' }}>
        {latestGlucoseTimestamp}
      </Typography>
    </GlucoseValueContainer>
  );
};

export default GlucoseValue;
