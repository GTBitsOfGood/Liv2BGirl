import React from "react";
import PropTypes from "prop-types";
import Thread from "../../../components/Group/Thread";
import ErrorPage from "../../_error";
import { getThread } from "../../../actions/GroupThread";
import { getCommentsByThread } from "../../../actions/Comment";
import { getGroup } from "../../../actions/Group";

const ThreadPage = ({ currentUser, error, thread, group, comments }) => {
  if (error != null) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <Thread
      currentUser={currentUser}
      thread={thread}
      group={group}
      comments={comments}
    />
  );
};

ThreadPage.getInitialProps = async ({ query, req }) => {
  const { threadid } = query;
  const cookies = req ? req.headers.cookie : null;

  return getThread(cookies, threadid)
    .then(async (thread) => {
      const group = await getGroup(cookies, thread.group);
      const comments = await getCommentsByThread(cookies, thread._id);

      return {
        thread,
        group,
        comments,
      };
    })
    .catch((error) => ({
      error: error.message,
    }));
};

ThreadPage.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
  error: PropTypes.string,
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }),
  }),
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
      taggedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.number.isRequired,
        avatarColor: PropTypes.number.isRequired,
      }),
    })
  ),
};

ThreadPage.defaultProps = {
  error: null,
  thread: null,
  group: null,
  comments: null,
};

ThreadPage.showTopNav = false;
ThreadPage.showBottomNav = false;

export default ThreadPage;
