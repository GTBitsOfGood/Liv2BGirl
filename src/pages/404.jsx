import React from "react";
import PropTypes from "prop-types";
import Error from "../components/Error";

const NotFoundPage = ({ currentUser }) => (
  <Error currentUser={currentUser} statusCode={404} message="Page not found!" />
);

NotFoundPage.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
};

NotFoundPage.showTopNav = false;
NotFoundPage.showBottomNav = false;

export default NotFoundPage;
