import { Button } from '@mui/material';
import { styled } from '@mui/system';

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
  textTransform: 'none',
  fontSize: '1rem',
  padding: '0.5rem',
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(1),
  },
}));

export default AnimatedButton;