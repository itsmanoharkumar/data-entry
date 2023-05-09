import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/layout/Layout";
import axios from "axios";
import { Provider } from "react-redux";
import { wrapper } from "@/store/store";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`;
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
