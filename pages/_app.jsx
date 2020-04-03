import App from "next/app";
import React from "react";
import Head from "next/head";
import BottomNavBar from "../client/components/NavBar/BottomNavBar";
import TopNavBar from "../client/components/NavBar/TopNavBar";
import "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";

// Global Styles
import "../public/styles/App.scss";
import "../public/styles/components.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>Liv2BGirl</title>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap"
            rel="stylesheet"
          />
        </Head>

        <div className="App">
          <div className="Content">
            <Component {...pageProps} />
          </div>
        </div>
        {![
          "/sign-up",
          "/sign-in",
          "/app/groups/thread",
          "/app/groups/new-group",
          "/app/ask-question",
        ].some(route => router.asPath.includes(route)) && (
          <>
            {!["/app/groups/", "/app/profile"].some(route =>
              router.asPath.includes(route)
            ) && (
              <>
                <TopNavBar />
              </>
            )}
            <BottomNavBar />
          </>
        )}
      </>
    );
  }
}
export default MyApp;
