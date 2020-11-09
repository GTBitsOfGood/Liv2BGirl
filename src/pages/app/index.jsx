import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import urls from "../../../utils/urls";

const AppHome = ({ currentUser }) => (
  <div>
    <h2>Welcome!</h2>
    <div>
      {currentUser.role === "Admin" && (
        <Link href={urls.pages.app.admin.index}>
          <a>Admin Controls</a>
        </Link>
      )}
    </div>
    <div>
      {
        <Link href={urls.pages.app.post.index}>
          <a>Create a Post!</a>
        </Link>
      }
    </div>
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
