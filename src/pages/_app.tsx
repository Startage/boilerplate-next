import { AccessDeniedErrorName } from '@/common/consts/errors';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthProvider } from '@/common/contexts/auth-context';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { theme } from '@/common/theme';
import Head from 'next/head';
import { GlobalStyles } from '@mui/material';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

Yup.setLocale(ptForm);

type AppPropsWithLayout = AppProps & {
  Component: NextPage;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const handleGlobalError = (err: any) => {
    if (err.name === AccessDeniedErrorName) {
      if (router.pathname !== PAGE_AUTH_LOGIN) router.replace(PAGE_AUTH_LOGIN);
    }
  };
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: handleGlobalError,
          },
          queries: {
            onError: handleGlobalError,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={css`
              html,
              body {
                height: 100%;
                padding: 0;
                margin: 0;
              }

              #__next {
                height: 100%;
                width: 100%;
              }
            `}
          />
          <Head>
            <title>App</title>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <SnackbarProvider maxSnack={5}>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
