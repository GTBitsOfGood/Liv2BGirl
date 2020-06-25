import React from "react";
import PropTypes from "prop-types";
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

const MyApp = ({ Component, pageProps, currentUser }) => (
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

MyApp.getInitialProps = async ({ Component, ctx, router }) => {
  const cookies = ctx.req ? ctx.req.headers.cookie : null;

  let pageProps = {};
  let currentUser = null;

  try {
    currentUser = await getCurrentUser(cookies);
    const pageRequiresRoles = Component.roles;

    if (currentUser == null && router.asPath.startsWith("/app")) {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: urls.pages.signIn,
        });
        ctx.res.end();
      } else {
        await Router.push(urls.pages.signIn);
      }
    } else if (
      pageRequiresRoles != null &&
      !pageRequiresRoles.includes(currentUser.role)
    ) {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: urls.pages.app.index,
        });
        ctx.res.end();
      } else {
        await Router.push(urls.pages.app.index);
      }
    }
  } catch (error) {
    console.error("error in _app", error);
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({
      ...ctx,
      currentUser,
    });
  }

  return {
    pageProps,
    currentUser,
  };
};

MyApp.propTypes = {
  Component: PropTypes.shape({
    ...PropTypes.node,
    showTopNav: PropTypes.bool,
    showBottomNav: PropTypes.bool,
  }),
  pageProps: PropTypes.any,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

export default MyApp;
