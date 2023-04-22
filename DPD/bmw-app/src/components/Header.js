import * as React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { DriveEta } from '@mui/icons-material';
import { Lock as LockIcon } from '@mui/icons-material';
import { Menu as MenuIcon } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1E1E1E',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const StyledDriveEta = styled(DriveEta)(({ theme }) => ({
  marginRight: '5px',
}));

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  flexGrow: 1,
  textAlign: 'center'
});

const Header = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <LogoBox>
          <StyledDriveEta />
          <StyledTypography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            BMW HealthDrive
          </StyledTypography>
        </LogoBox>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                zIndex: 0,
                transform: 'translateY(-50%) rotate(45deg)',
                boxShadow: 'rgba(0, 0, 0, 0.295) 0px 2px 8px',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Typography variant="body2">Dashboard</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body2">Patient Information</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body2">Car Information</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body2">Help & Support</Typography>
            </MenuItem>
          </Menu>
          <Typography variant="body1" color="inherit">
            {formattedTime}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              aria-controls="help-menu"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                fontSize: '1rem',
                padding: '0.5rem',
                textTransform: 'none',
              }}
            >
              Help & Support
            </Button>
            <Menu
              id="help-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>FAQ</MenuItem>
              <MenuItem onClick={handleClose}>Documentation</MenuItem>
              <MenuItem onClick={handleClose}>Contact Support</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              startIcon={<LockIcon />}
              sx={{
                fontSize: '1rem',
                padding: '0.5rem',
                textTransform: 'none',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {!isSmallScreen && 'Login'}
            </Button>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
    );
  };
  
  export default Header;
  
