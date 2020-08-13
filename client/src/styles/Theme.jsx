import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colours: {
    primary: '#f2976c',
    secondary: '#fbe8a6',
    tertiary: '#303c6c',
  },
  iconSize: '2em',
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;