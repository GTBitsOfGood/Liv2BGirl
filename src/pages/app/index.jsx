import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Newsfeed from "../../components/Newsfeed";
import urls from "../../../utils/urls";

const AppHome = ({ currentUser }) => (
  <div>
    <h2>Welcome!</h2>
    {currentUser.role === "Admin" && (
      <Link href={urls.pages.app.admin.index}>
        <a>Admin Controls</a>
      </Link>
    )}

    <Newsfeed />
  </div>
);

AppHome.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

AppHome.showTopNav = true;
AppHome.showBottomNav = true;

export default AppHome;
