import { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavbarResponsive from "../components/NavbarResponsive";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
// import { store } from "../redux/store";
import { wrapper } from "../redux/store";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <NextNProgress color="#9762f5" />
      <div className="container">
        <Provider store={store}>
          <NavbarResponsive setNavOpen={setNavOpen} navOpen={navOpen} />
          <Navbar setNavOpen={setNavOpen} />
          <Component {...props.pageProps} />
          <Footer />
        </Provider>
      </div>
    </>
  );
};

export default App;
