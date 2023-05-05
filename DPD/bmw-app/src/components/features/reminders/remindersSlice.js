import { createSlice } from '@reduxjs/toolkit';

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState: {
    reminders: [],
  },
  reducers: {
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },
    removeReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id !== action.payload
      );
    },
  },
});

export const { addReminder, removeReminder } = remindersSlice.actions;

export const selectReminders = (state) => state.reminders.reminders;

export default remindersSlice.reducer;

