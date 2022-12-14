import { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavbarResponsive from "../components/NavbarResponsive";

export default function App({ Component, pageProps }: AppProps) {
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
      <div className="container">
        <NavbarResponsive setNavOpen={setNavOpen} navOpen={navOpen} />
        <Navbar setNavOpen={setNavOpen} />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
