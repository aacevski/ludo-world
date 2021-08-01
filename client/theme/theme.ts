import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Roboto',
  },

  colors: {
    dark: {
      primary: '#BB86FC',
      primaryVariant: '#3700B3',
      secondary: '#03DAC6',
      background: '#121212',
      error: '#CF6679',
      onPrimary: '#000000',
      onSecondary: '#FFFFFF',
    },
  },
});

export default theme;
