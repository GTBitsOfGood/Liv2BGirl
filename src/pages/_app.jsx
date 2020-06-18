import App from "next/app";
import React from "react";
import Head from "next/head";
import Router from "next/router";
import "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import { getCurrentUser } from "../actions/User";
import urls from "../../utils/urls";
import "../../public/static/styles/App.scss";
import "../../public/static/styles/components.scss";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    const cookies = appContext.ctx.req
      ? appContext.ctx.req.headers.cookie
      : null;

    try {
      const currentUser = await getCurrentUser(cookies);
      const pageRequiresRoles = appContext.Component.roles;

      if (currentUser == null && appContext.router.asPath.startsWith("/app")) {
        if (appContext.ctx.res) {
          appContext.ctx.res.writeHead(302, {
            Location: urls.pages.signIn,
          });
          appContext.ctx.res.end();
        } else {
          await Router.push(urls.pages.signIn);
        }
      } else if (
        pageRequiresRoles != null &&
        !pageRequiresRoles.includes(currentUser.role)
      ) {
        if (appContext.ctx.res) {
          appContext.ctx.res.writeHead(302, {
            Location: urls.pages.app.index,
          });
          appContext.ctx.res.end();
        } else {
          await Router.push(urls.pages.app.index);
        }
      }

      return {
        ...appProps,
        currentUser,
      };
    } catch (error) {
      console.error("error in _app", error);

      return appProps;
    }
  }

  render() {
    const { Component, pageProps, currentUser } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <title>Liv2BGirl</title>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap"
            rel="stylesheet"
          />
        </Head>

        {Component.showTopNav && <TopNavBar currentUser={currentUser} />}
        <div id="Content">
          <Component {...pageProps} currentUser={currentUser} />
        </div>
        {Component.showBottomNav && <BottomNavBar />}
      </>
    );
  }
}

export default MyApp;
