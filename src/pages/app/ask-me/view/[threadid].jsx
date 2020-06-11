import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "../../../_error";
import Question from "../../../../components/AskMe/Question";
import { getThread } from "../../../../actions/AskMe";
import { getCommentsByAskMeThread } from "../../../../actions/Comment";

const QuestionPage = ({ currentUser, error, thread, comments }) => {
  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <Question currentUser={currentUser} thread={thread} comments={comments} />
  );
};

QuestionPage.getInitialProps = async ({ query, req }) => {
  const { threadid } = query;
  const cookies = req ? req.headers.cookie : null;

  try {
    const thread = await getThread(cookies, threadid);
    const comments = await getCommentsByAskMeThread(cookies, threadid);

    return {
      thread,
      comments,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

QuestionPage.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  error: PropTypes.string,
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    visibility: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userId: PropTypes.string,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }),
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      parent: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      officialAnswer: PropTypes.bool.isRequired,
      postedAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.number.isRequired,
        avatarColor: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
};

QuestionPage.defaultProps = {
  error: null,
  thread: null,
  author: null,
  comments: [],
};

QuestionPage.showTopNav = false;
QuestionPage.showBottomNav = false;

export default QuestionPage;
