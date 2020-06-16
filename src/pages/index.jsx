import React from "react";
import IndexHeader from "../components/IndexHeader";

const HomePage = () => (
  <>
    <IndexHeader />
    <h1>Welcome!</h1>
  </>
);

HomePage.showTopNav = false;
HomePage.showBottomNav = false;

export default HomePage;
