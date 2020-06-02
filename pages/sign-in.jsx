import React from "react";
import Router from "next/router";
import SignInComponent from "../client/components/SignIn";
import { getCurrentUser } from "../client/actions/User";
import urls from "../utils/urls";

const SignIn = () => <SignInComponent />;

SignIn.getInitialProps = async ({ req, res }) => {
  const cookies = req ? req.headers.cookie : null;

  return getCurrentUser(cookies)
    .then(async () => {
      if (res) {
        res.writeHead(302, {
          Location: urls.pages.app.home,
        });
        res.end();
      } else {
        await Router.push(urls.pages.app.home);
      }
    })
    .catch(() => ({}));
};

SignIn.showTopNav = false;
SignIn.showBottomNav = false;

export default SignIn;
