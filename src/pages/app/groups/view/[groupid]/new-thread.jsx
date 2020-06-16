import React from "react";
import PropTypes from "prop-types";
import NewThread from "../../../../../components/Group/Thread/New";

const NewThreadPage = ({ currentUser }) => (
  <NewThread currentUser={currentUser} />
);

NewThreadPage.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

NewThreadPage.showTopNav = false;
NewThreadPage.showBottomNav = false;

export default NewThreadPage;
