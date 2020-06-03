import React from "react";
import PropTypes from "prop-types";
import Thread from "../../../client/components/Group/Thread";
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
    return (
      <div>
        <h2>Thread not found :(</h2>
      </div>
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

ThreadPage.getInitialProps = async ({ query }) => {
  const { threadid } = query;

  return getThread(threadid)
    .then(async thread => {
      const author = await getUser(thread.posterId);
      const group = await getGroup(thread.groupId);
      const comments = await getCommentsByThread(thread._id);

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
      _id: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
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
