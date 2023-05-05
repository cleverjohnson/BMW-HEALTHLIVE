import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  borderRadius: '12px',
  border: `2px solid ${theme.palette.primary.main}`,
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize: '1.2rem', // increase header font size
  },
  '& .MuiCardContent-root': {
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
  },
}));

const ContentContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '0 0 10px 10px',
  padding: '1rem',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
}));

const InfoCard = React.forwardRef(({ title, data, data2 }, ref) => (
  <StyledCard ref={ref}>
    <CardHeader
      title={title}
      titleTypographyProps={{
        variant: 'h6',
        color: 'white',
        fontWeight: 'bold',
      }}
    />
    <CardContent>
      <ContentContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {data &&
            data.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="subtitle2" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {label}:
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: '#FFFFFF', lineHeight: '1.2', fontSize: '0.8rem' }}
                >
                  {value || 'N/A'}
                </Typography>
              </div>
            ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {data2 &&
            data2.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="subtitle2" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {label}:
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: '#FFFFFF', lineHeight: '1.2', fontSize: '0.8rem' }}
                >
                  {value || 'N/A'}
                </Typography>
              </div>
            ))}
        </Box>
      </ContentContainer>
    </CardContent>
  </StyledCard>
));

export default InfoCard;
