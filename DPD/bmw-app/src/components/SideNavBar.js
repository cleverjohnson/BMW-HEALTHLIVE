import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery } from '@mui/material';
import { DriveEta, Person, Timeline, Warning } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AccessAlarms } from '@mui/icons-material';

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
        },
        '& .MuiListItem-root:hover': {
          backgroundColor: '#3C3C3C',
          color: '#FFFFFF',
        },
        '& .MuiListItemIcon-root': {
          color: '#FFFFFF',
        },
      }}
    >
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <Link
              to={item.route}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem button sx={{ fontSize: '18px' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
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
