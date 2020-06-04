import React from "react";
import PropTypes from "prop-types";
import NewQuestion from "../../../components/AskMe/New";

const NewQuestionPage = ({ currentUser }) => (
  <NewQuestion currentUser={currentUser} />
);

NewQuestionPage.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

NewQuestionPage.showTopNav = false;
NewQuestionPage.showBottomNav = false;

export default NewQuestionPage;
