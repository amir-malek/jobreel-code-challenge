import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#3f3bf1',
    },
    secondary: {
      main: '#19857b',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '56px'
        }
      }
    }
  }
});

export default theme;