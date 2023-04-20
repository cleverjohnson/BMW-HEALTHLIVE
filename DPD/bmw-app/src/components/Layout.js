import * as React from 'react';
import Header from './Header';
import SideNavBar from './SideNavBar';
import { Box, useMediaQuery } from '@mui/material';

const Layout = ({ children }) => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FFFFFF' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {!isSmallScreen && (
          <Box sx={{ minWidth: '240px', bgcolor: '#3A3A3A', color: '#FFFFFF' }}>
            <SideNavBar />
          </Box>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
