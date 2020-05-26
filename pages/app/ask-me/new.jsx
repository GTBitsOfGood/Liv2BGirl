import React from "react";
import PropTypes from "prop-types";

// Page Component
import NewQuestion from "../../../client/components/AskMe/New";

const NewQuestionPage = ({ currentUser }) => {
  return <NewQuestion currentUser={currentUser} />;
};

NewQuestionPage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

NewQuestionPage.showTopNav = false;
NewQuestionPage.showBottomNav = false;

export default NewQuestionPage;
