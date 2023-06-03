import UserAuthContext from "@/context/UserAuthContext";
import createEmotionCache from "@/createEmotionCache";
import Layout from "@/layouts/layout";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import { CacheProvider, EmotionCache } from "@emotion/react";
import "@fontsource/poppins/100-italic.css";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200-italic.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500-italic.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700-italic.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800-italic.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900-italic.css";
import "@fontsource/poppins/900.css";
import { StyledEngineProvider } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
axios.defaults.withCredentials = true;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <SWRConfig>
            <CookiesProvider>
              <Provider store={store}>
                <UserAuthContext>
                  <SnackbarProvider maxSnack={3}>
                    <Layout>
                      <Component {...pageProps} />
                      <Analytics />
                      {/*<CookieConsent>*/}
                      {/*  This website uses cookies to enhance the user experience.*/}
                      {/*</CookieConsent>*/}
                    </Layout>
                  </SnackbarProvider>
                </UserAuthContext>
              </Provider>
            </CookiesProvider>
          </SWRConfig>
        </CacheProvider>
      </StyledEngineProvider>
    </>
  );
}
