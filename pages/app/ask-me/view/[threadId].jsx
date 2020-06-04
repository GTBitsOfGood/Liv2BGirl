import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "../../../_error";
import Question from "../../../../client/components/AskMe/Question";
import { getThread } from "../../../../client/actions/AskMe";
import { getCommentsByAskMeThread } from "../../../../client/actions/Comment";
import { getUser } from "../../../../client/actions/User";

const QuestionPage = ({
  currentUser,
  error,
  threadId,
  thread,
  author,
  comments,
}) => {
  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <Question
      currentUser={currentUser}
      threadId={threadId}
      thread={thread}
      author={author}
      comments={comments}
    />
  );
};

QuestionPage.getInitialProps = async ({ query, req }) => {
  const { threadId } = query;
  const cookies = req ? req.headers.cookie : null;

  try {
    const thread = await getThread(cookies, threadId);
    const author =
      thread.visibility === "Anonymous"
        ? {
            userId: null,
            username: "Anonymous",
            avatar: 1,
            avatarColor: 1,
          }
        : await getUser(thread.posterId).then(user => ({
            userId: user._id,
            username: user.username,
            avatar: user.avatar,
            avatarColor: user.avatarColor,
          }));
    const comments = await getCommentsByAskMeThread(thread._id);

    return {
      threadId,
      thread,
      author,
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
  threadId: PropTypes.string.isRequired,
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    posterId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    visibility: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
  }),
  author: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.number.isRequired,
        avatarColor: PropTypes.number.isRequired,
      }).isRequired,
      comment: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        parentId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        officialAnswer: PropTypes.bool.isRequired,
        postedAt: PropTypes.string.isRequired,
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
