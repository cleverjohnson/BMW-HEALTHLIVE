import * as React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Lock as LockIcon } from '@mui/icons-material';
import AnimatedButton from './AnimatedButton';
import bmwLogo from '../assets/bmw.png';

const StyledLogoContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '40px',
  width: '40px',
  marginLeft: '3.5rem',
  transformStyle: 'preserve-3d',
}));

const StyledLogo = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  transformStyle: 'preserve-3d',
  boxShadow: `0px 0px 10px rgba(255, 255, 255, 0.5)`,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#030303',
  height: '64px',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  height: '64px',
});

const Header = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = React.useMemo(() => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return currentTime.toLocaleString('en-US', options);
  }, [currentTime]);

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <StyledLogoContainer>
          <StyledLogo src={bmwLogo} alt="BMW" />
        </StyledLogoContainer>
        <Typography variant="h6" component="div">
          Glucose Monitoring for Road Safety
        </Typography>
        <Typography variant="body1" color="inherit" sx={{ marginLeft: '9rem' }}>
          {formattedTime}
        </Typography>
        <Box>
          <AnimatedButton color="inherit" endIcon={<LockIcon />}>
            Login
          </AnimatedButton>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
