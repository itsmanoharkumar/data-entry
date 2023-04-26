import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/layout/Layout";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.AUTH_TOKEN}`;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
