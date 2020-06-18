import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "../../_error";
import AskMe from "../../../components/AskMe";
import { getUserAskBookmarks } from "../../../actions/User";
import { getAskThreads, getUserQuestions } from "../../../actions/AskMeThread";

const AskMePage = ({
  error,
  currentUser,
  featuredQuestions,
  ownQuestions,
  bookmarks,
}) => {
  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <AskMe
      featuredQuestions={featuredQuestions}
      ownQuestions={ownQuestions}
      bookmarks={bookmarks}
    />
  );
};

AskMePage.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  try {
    const featuredQuestions = await getAskThreads(cookies);
    const ownQuestions = await getUserQuestions(cookies);
    const bookmarks = await getUserAskBookmarks(cookies);

    return {
      featuredQuestions,
      ownQuestions,
      bookmarks,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const QuestionType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
}).isRequired;

AskMePage.propTypes = {
  error: PropTypes.string,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  featuredQuestions: PropTypes.arrayOf(QuestionType),
  ownQuestions: PropTypes.arrayOf(QuestionType),
  bookmarks: PropTypes.arrayOf(QuestionType),
};

AskMePage.defaultProps = {
  error: null,
  featuredQuestions: null,
  ownQuestions: null,
  bookmarks: null,
};

AskMePage.showTopNav = true;
AskMePage.showBottomNav = true;

export default AskMePage;
