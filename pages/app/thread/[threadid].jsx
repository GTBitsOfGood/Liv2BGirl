import React from "react";
import PropTypes from "prop-types";

// Component
import Thread from "../../../client/components/Group/Thread";

// API Calls
import { getThread } from "../../../client/actions/Thread";
import { getCommentsByThread } from "../../../client/actions/Comment";
import { getUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const ThreadPage = props => {
  const { currentUser, data } = props;

  return <Thread thread={data} currentUser={currentUser} />;
};

ThreadPage.getInitialProps = async ({ query }) => {
  const { threadid } = query;

  const data = {
    threadid,
  };

  await getThread(threadid).then(async res => {
    if (res) {
      data.title = res.title;
      data.postedAt = res.postedAt;
      data.content = res.content;

      await getUser(res.posterId).then(user => {
        if (user) {
          data.author = user;
        }
      });

      await getGroup(res.groupId).then(group => {
        if (group) {
          data.groupId = group.id;
          data.groupName = group.name;
        }
      });

      await getCommentsByThread(res._id).then(comments => {
        data.comments = comments || [];
      });
    }
  });

  return {
    data,
  };
};

ThreadPage.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,

  data: PropTypes.shape({
    threadid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }).isRequired,
    groupId: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
  }).isRequired,
};

ThreadPage.showTopNav = false;
ThreadPage.showBottomNav = false;

export default ThreadPage;
