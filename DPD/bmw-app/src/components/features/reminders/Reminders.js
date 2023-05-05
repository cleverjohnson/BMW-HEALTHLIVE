import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReminder, removeReminder, selectReminders } from './remindersSlice';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';

const RemindersContainer = styled('div')({
  margin: '20px auto',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
  maxWidth: '500px',
});

const RemindersList = styled(List)({
  marginTop: '20px',
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
});

const ReminderItem = styled(ListItem)({
  transition: 'all 0.2s ease-out',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const DeleteButton = styled(IconButton)({
  color: '#FFFFFF',
  backgroundColor: '#F44336',
  '&:hover': {
    backgroundColor: '#D32F2F',
  },
});

const Reminders = () => {
  const [newReminder, setNewReminder] = useState('');
  const reminders = useSelector(selectReminders);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      dispatch(addReminder({ id: Date.now(), text: newReminder }));
      setNewReminder('');
      enqueueSnackbar('Reminder added', { variant: 'success' });
    }
  };

  const handleDeleteReminder = (id) => {
    dispatch(removeReminder(id));
    enqueueSnackbar('Reminder deleted', { variant: 'warning' });
  };

  return (
    <RemindersContainer>
      <h2>Reminders</h2>
      <TextField
        label="New Reminder"
        value={newReminder}
        onChange={(e) => setNewReminder(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddReminder()}
      />
      <Button onClick={handleAddReminder} variant="contained" sx={{ marginLeft: '10px' }}>
        Add Reminder
      </Button>
      <RemindersList>
        {reminders.map((reminder) => (
          <ReminderItem key={reminder.id}>
            <ListItemText primary={reminder.text} />
            <ListItemSecondaryAction>
              <DeleteButton edge="end" onClick={() => handleDeleteReminder(reminder.id)}>
                <Delete />
              </DeleteButton>
            </ListItemSecondaryAction>
          </ReminderItem>
        ))}
      </RemindersList>
    </RemindersContainer>
  );
};

export default Reminders;
