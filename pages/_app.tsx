import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/layout/Layout";
import axios from "axios";
import { Provider } from "react-redux";
import { wrapper } from "@/store/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
axios.defaults.withCredentials = true;

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}
