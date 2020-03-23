import App from "next/app";
import React from "react";
import Head from "next/head";
import BottomNavBar from "../client/components/BottomNavBar";
import TopNavBar from "../client/components/TopNavBar";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "../public/static/App.scss";
import "../public/static/Account.scss";
import "../public/static/Avatar.scss";

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
        {![
          "/sign-up",
          "/sign-in",
          "/app/groups/thread",
          "/app/groups/newgroup",
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
