import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery, IconButton, Box } from '@mui/material';
import { DriveEta, Person, Timeline, Warning, Menu, ChevronLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AccessAlarms } from '@mui/icons-material';
import { useState } from 'react';

const menuItems = [
  {
    label: 'Patient Info',
    icon: <Person />,
    route: '/patient-info',
  },
  {
    label: 'Glucose Monitoring',
    icon: <Timeline />,
    route: '/glucose-data',
  },
  {
    label: 'Reminders',
    icon: <AccessAlarms />,
    route: '/reminders',
  },
  {
    label: 'Safety Alerts',
    icon: <Warning />,
    route: '/alerts',
  },
  {
    label: 'Car Info',
    icon: <DriveEta />,
    route: '/car-info',
  },
];

const SideNavBar = () => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [expanded, setExpanded] = useState(!isSmallScreen);

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      anchor="left"
      open={isSmallScreen ? drawerOpen : true}
      onClose={() => setDrawerOpen(false)}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px',
          backgroundColor: '#030303',
          color: '#FFFFFF',
          borderRight: '1px solid #cfd8dc',
        },
        '& .MuiListItem-root.Mui-selected': {
          backgroundColor: '#3C3C3C',
          color: '#FFFFFF',
        },
        '& .MuiListItem-root': {
          paddingLeft: '16px',
          paddingRight: '16px',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: '#3C3C3C',
            color: '#FFFFFF',
          },
        },
        '& .MuiListItemIcon-root': {
          color: '#FFFFFF',
          minWidth: expanded ? 'auto' : '56px', // Adjust icon spacing when collapsed
          transition: 'min-width 0.2s',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
        }}
      >
        <Box sx={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: expanded ? 'flex-start' : 'center', width: '100%', }}>
          {expanded ? 'HEALTHDRIVE' : 'BMW'}
        </Box>
        {!isSmallScreen && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="toggle sidebar"
            onClick={() => setExpanded(!expanded)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {          expanded ? <ChevronLeft /> : <Menu />
        }
      </IconButton>
    )}
  </Box>
  <Divider />
  <List>
    {menuItems.map((item, index) => (
      <React.Fragment key={item.label}>
        <Link
          to={item.route}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem
            button
            sx={{
              fontSize: '18px',
              paddingTop: 3,
              paddingBottom: 2,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              ...(window.location.pathname === item.route && {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: expanded ? 'flex-start' : 'center',
                width: '100%',
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {expanded && <ListItemText primary={item.label} />}
            </Box>
          </ListItem>
        </Link>
        {index !== menuItems.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </List>
</Drawer>
);
};

export default SideNavBar;
