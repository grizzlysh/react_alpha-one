import '@/styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactQueryDevtools } from 'react-query/devtools'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material'

import theme from '@/utils/theme'
import configs from '@/configs/config'
import { store, persistor } from '@/stores/store';
import { IS_DEVELOPMENT } from '@/configs/constant';
import createEmotionCache from '@/utils/createEmotionCache'



// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount      : false,
      refetchOnReconnect  : false,
      retry               : false,
      staleTime           : 5*60*1000,
    },
  },
});

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// export default function App({ Component, pageProps }: AppProps) {
export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools
            initialIsOpen={
              IS_DEVELOPMENT && configs.env.reactQueryDevTools ? true : false
            }
          />
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>            
              <ToastContainer />
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>

          </CacheProvider>
          </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
  return <Component {...pageProps} />
}
