import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066B2', // BMW Blue
    },
    secondary: {
      main: '#1E1E3B', // BMW Dark Blue
    },
    text: {
      primary: '#000000', // black
      secondary: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      lightGrey: '#F2F2F2',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
