import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import '@fontsource/roboto';

import theme from '../theme/theme';
import SocketsProvider from 'providers/SocketProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SocketsProvider>
        <Component {...pageProps} />
      </SocketsProvider>
    </ChakraProvider>
  );
}
export default MyApp;
