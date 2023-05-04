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
    padding: theme.spacing(1),
  },
  '& .MuiCardContent-root': {
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
  },
}));

const InfoCard = React.forwardRef(({ title, data }, ref) => (
  <StyledCard ref={ref}>
    <CardHeader title={title} titleTypographyProps={{ variant: 'subtitle1', fontSize: '0.9rem' }} />
    <CardContent>
      <Grid container spacing={1}>
        {data &&
          data.map(({ label, value }) => (
            <Grid item xs={12} key={label}>
              <Typography variant="subtitle2" component="div" gutterBottom sx={{ fontSize: '0.8rem' }}>
                <strong>{label}</strong>
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ color: '#666666', lineHeight: '1.2', fontSize: '0.7rem' }}
              >
                {value}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </CardContent>
  </StyledCard>
));

export default InfoCard;
