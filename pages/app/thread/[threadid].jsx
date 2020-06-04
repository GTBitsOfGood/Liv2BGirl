import React from "react";
import PropTypes from "prop-types";
import Thread from "../../../client/components/Group/Thread";
import ErrorPage from "../../_error";
import { getThread } from "../../../client/actions/Thread";
import { getCommentsByThread } from "../../../client/actions/Comment";
import { getUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const ThreadPage = ({
  currentUser,
  error,
  thread,
  author,
  group,
  comments,
}) => {
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
      author={author}
      group={group}
      comments={comments}
    />
  );
};

ThreadPage.getInitialProps = async ({ query, req }) => {
  const { threadid } = query;
  const cookies = req ? req.headers.cookie : null;

  return getThread(cookies, threadid)
    .then(async thread => {
      const author = await getUser(cookies, thread.posterId);
      const group = await getGroup(cookies, thread.groupId);
      const comments = await getCommentsByThread(cookies, thread._id);

      return {
        thread,
        author,
        group,
        comments,
      };
    })
    .catch(error => ({
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
  }),
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        postedAt: PropTypes.string.isRequired,
      }),
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
  author: null,
  group: null,
  comments: null,
};

ThreadPage.showTopNav = false;
ThreadPage.showBottomNav = false;

export default ThreadPage;
