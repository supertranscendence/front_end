import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#3A123E',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#44b700',
    },
  // warning == Yellow

  },
});

export default theme;
