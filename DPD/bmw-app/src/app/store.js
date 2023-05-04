import { configureStore } from '@reduxjs/toolkit';
import remindersReducer from '../components/features/reminders/remindersSlice';

export const store = configureStore({
  reducer: {
    reminders: remindersReducer,
  },
});
