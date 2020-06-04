import React from "react";
import PropTypes from "prop-types";
import Error from "../client/components/Error";

const ErrorPage = ({ currentUser, statusCode, message }) => (
  <Error currentUser={currentUser} statusCode={statusCode} message={message} />
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    statusCode,
  };
};

ErrorPage.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    avatarColor: PropTypes.string.isRequired,
  }),
  statusCode: PropTypes.number.isRequired,
  message: PropTypes.string,
};

ErrorPage.defaultProps = {
  currentUser: null,
  message: null,
};

ErrorPage.showTopNav = false;
ErrorPage.showBottomNav = false;

export default ErrorPage;
