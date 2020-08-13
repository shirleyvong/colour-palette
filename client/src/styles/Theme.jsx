import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colours: {
    primary: '#f2976c',
    secondary: '#fbe8a6',
    tertiary: '#737373',
    backgroundGradient: 'linear-gradient(78deg, rgba(247,195,139,1) 0%, rgba(242,151,108,1) 100%)',
    background: 'rgb(247,195,139)',
  },
  iconSize: '2em',
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
