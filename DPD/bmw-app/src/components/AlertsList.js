import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const AlertsList = ({ alerts }) => {
  const [displayedAlerts, setDisplayedAlerts] = useState(alerts.slice(0, 5));
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= fullHeight && displayedAlerts.length < alerts.length) {
        const endIndex = Math.min(displayedAlerts.length + 5, alerts.length);
        setDisplayedAlerts([...displayedAlerts, ...alerts.slice(displayedAlerts.length, endIndex)]);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedAlerts, alerts]);

  return (
    <List>
      <Typography variant="h6">Alerts</Typography>
      {displayedAlerts.map((alert, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={alert.message}
            secondary={`Timestamp: ${alert.timestamp}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AlertsList;
