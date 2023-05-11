import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/layout/Layout";
import axios from "axios";
import { Provider } from "react-redux";
import { wrapper } from "@/store/store";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/createEmotionCache";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import React from "react";
import SideNavDrawer from "@/components/molecules/SideNavDrawer/SideNavDrawer";

axios.defaults.withCredentials = true;

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, ...rest }: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Layout>
            <SideNavDrawer />
            <div className={"flex justify-center w-full"}>
              <Component {...pageProps} />
            </div>
          </Layout>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
