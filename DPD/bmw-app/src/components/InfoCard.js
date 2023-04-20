import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  borderRadius: '0',
  border: `2px solid ${theme.palette.primary.main}`,
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
}));

const InfoCard = ({ title, data }) => (
  <StyledCard>
    <CardHeader title={title} />
    <CardContent>
      <Grid container spacing={2}>
        {data && data.map(({ label, value }) => (
          <Grid item xs={12} key={label}>
            <Typography variant="subtitle1" component="div" gutterBottom>
              <strong>{label}</strong>
            </Typography>
            <Typography variant="body1" component="div" sx={{ color: '#666666' }}>
              {value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </StyledCard>
);

export default InfoCard;
