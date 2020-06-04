import React from "react";
import PropTypes from "prop-types";
import AskMe from "../../../client/components/AskMe";
import {
  getCurrentUser,
  getUserAskBookmarks,
} from "../../../client/actions/User";
import { getAskThreads, getUserQuestions } from "../../../client/actions/AskMe";

const AskMePage = ({ featuredQuestions, ownQuestions, bookmarks }) => (
  <AskMe
    featuredQuestions={featuredQuestions}
    ownQuestions={ownQuestions}
    bookmarks={bookmarks}
  />
);

AskMePage.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  const featuredQuestions = await getAskThreads(cookies);
  const ownQuestions = await getUserQuestions(cookies);
  const bookmarks = await getUserAskBookmarks(cookies);

  return {
    featuredQuestions,
    ownQuestions,
    bookmarks,
  };
};

const QuestionType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  posterId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
}).isRequired;

AskMePage.propTypes = {
  featuredQuestions: PropTypes.arrayOf(QuestionType).isRequired,
  ownQuestions: PropTypes.arrayOf(QuestionType).isRequired,
  bookmarks: PropTypes.arrayOf(QuestionType).isRequired,
};

AskMePage.showTopNav = true;
AskMePage.showBottomNav = true;

export default AskMePage;
