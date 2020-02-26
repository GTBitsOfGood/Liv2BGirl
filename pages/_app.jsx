import App from "next/app";
import React from "react";
import Head from "next/head";
import Header from "../client/components/Header";
import NavBar from "../client/components/NavBar";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../public/static/App.css";
import "../public/static/SignUp.css";

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
