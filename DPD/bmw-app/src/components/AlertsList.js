import * as React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const AlertsList = ({ alerts }) => (
  <List>
    {alerts.map((alert) => (
      <ListItem key={alert.id}>
        <ListItemText
          primary={alert.message}
          secondary={`Timestamp: ${alert.timestamp}`}
        />
      </ ListItem>
    ))}
  </List>
);

export default AlertsList;
