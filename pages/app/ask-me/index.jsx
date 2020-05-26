import React from "react";
import PropTypes from "prop-types";

// API Calls
import { getCurrentUser } from "../../../client/actions/User";
import { getAskThreads, getUserQuestions } from "../../../client/actions/AskMe";

// Page Component
import AskMe from "../../../client/components/AskMe";

const AskMePage = ({
  currentUser,
  featuredQuestions,
  ownQuestions,
  bookmarks,
}) => {
  return (
    <AskMe
      loggedIn={currentUser != null}
      featuredQuestions={featuredQuestions}
      ownQuestions={ownQuestions}
      bookmarks={bookmarks}
    />
  );
};

AskMePage.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  const user = await getCurrentUser(cookies);

  const featuredQuestions = await getAskThreads();
  const ownQuestions = user ? await getUserQuestions(user.id) : [];
  const bookmarks = [];

  return {
    featuredQuestions,
    ownQuestions,
    bookmarks,
  };
};

const QuestionType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  posterId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
}).isRequired;

AskMePage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  featuredQuestions: PropTypes.arrayOf(QuestionType).isRequired,
  ownQuestions: PropTypes.arrayOf(QuestionType).isRequired,
  bookmarks: PropTypes.arrayOf(QuestionType).isRequired,
};

AskMePage.showTopNav = false;
AskMePage.showBottomNav = true;

export default AskMePage;
