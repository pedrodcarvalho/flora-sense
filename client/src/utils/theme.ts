import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#A7E9AF',
      main: '#4CAF50',
      dark: '#2E7D32',
    },
    secondary: {
      light: '#FFD95A',
      main: '#FFC107',
      dark: '#FF9800',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
    },
    grey: {
      50: '#F8F9FA',
      100: '#E9ECEF',
      200: '#DEE2E6',
      300: '#CED4DA',
      400: '#ADB5BD',
      500: '#6C757D',
      600: '#495057',
      700: '#343A40',
      800: '#212529',
      900: '#121212',
    },
  },

  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 16,

    h1: { fontSize: '3.75rem' },
    h2: { fontSize: '3rem' },
    h3: { fontSize: '2.25rem' },
    h4: { fontSize: '1.875rem' },
    h5: { fontSize: '1.5rem' },
    h6: { fontSize: '1.25rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem' },

    allVariants: {
      fontFamily: '"Montserrat", sans-serif',
    },
  },

  spacing: 4,

  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.05)',
    '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    '0 1px 1px rgba(0, 0, 0, 0.1)',
    '0 2px 2px rgba(0, 0, 0, 0.2)',
    '0 3px 3px rgba(0, 0, 0, 0.3)',
    '0 4px 4px rgba(0, 0, 0, 0.4)',
    '0 5px 5px rgba(0, 0, 0, 0.5)',
    '0 6px 6px rgba(0, 0, 0, 0.6)',
    '0 7px 7px rgba(0, 0, 0, 0.7)',
    '0 8px 8px rgba(0, 0, 0, 0.8)',
    '0 9px 9px rgba(0, 0, 0, 0.9)',
    '0 10px 10px rgba(0, 0, 0, 1)',
    '0 11px 11px rgba(0, 0, 0, 0.1)',
    '0 12px 12px rgba(0, 0, 0, 0.2)',
    '0 13px 13px rgba(0, 0, 0, 0.3)',
    '0 14px 14px rgba(0, 0, 0, 0.4)',
    '0 15px 15px rgba(0, 0, 0, 0.5)',
    '0 16px 16px rgba(0, 0, 0, 0.6)',
    '0 17px 17px rgba(0, 0, 0, 0.7)',
  ],

  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;
