import App from "next/app";
import React from "react";
import Head from "next/head";
<<<<<<< HEAD
=======
import NavBar from "../client/components/NavBar";
>>>>>>> b627e6e5bdf511a75be9820cecd2751d75b944ae
import "bootstrap-css-only/css/bootstrap.min.css";
import "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "../public/static/App.css";
import "../public/static/SignUp.css";
import "../public/static/Avatar.css";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>Liv2BGirl</title>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
            rel="stylesheet"
          />
        </Head>

        <div className="App">
          <div className="Content">
            <Component {...pageProps} />
          </div>
        </div>
        {!["/sign-up", "/sign-in"].includes(router.asPath) && <NavBar />}
      </>
    );
  }
}
export default MyApp;
