import React from "react";
import PropTypes from "prop-types";
import Notification from "../../components/Notification";

const NotificationPage = ({ currentUser }) => (
  <Notification currentUser={currentUser} />
);

NotificationPage.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

NotificationPage.showTopNav = false;
NotificationPage.showBottomNav = true;

export default NotificationPage;
