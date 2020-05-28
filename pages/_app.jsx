import App from "next/app";
import React from "react";
import Head from "next/head";
import BottomNavBar from "../client/components/NavBar/BottomNavBar";
import TopNavBar from "../client/components/NavBar/TopNavBar";
import { getCurrentUser } from "../client/actions/User";
import "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "../public/styles/App.scss";
import "../public/styles/components.scss";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    const cookies = appContext.ctx.req
      ? appContext.ctx.req.headers.cookie
      : null;

    return getCurrentUser(cookies)
      .then(user => ({
        ...appProps,
        currentUser: user,
      }))
      .catch(() => appProps);
  }

  render() {
    const { Component, pageProps, currentUser } = this.props;

    return (
      <>
        <Head>
          <title>Liv2BGirl</title>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap"
            rel="stylesheet"
          />
        </Head>

        <div className="Content">
          <Component {...pageProps} currentUser={currentUser} />
        </div>

        {Component.showTopNav && <TopNavBar currentUser={currentUser} />}
        {Component.showBottomNav && (
          <BottomNavBar loggedIn={currentUser != null} />
        )}
      </>
    );
  }
}

export default MyApp;
