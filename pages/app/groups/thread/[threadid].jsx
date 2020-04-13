import React, { useState } from "react";

import Thread from "../../../../client/components/Group/Thread";
import { getThread } from "../../../../client/actions/Thread";
import { getCommentsByThread } from "../../../../client/actions/Comment";
import { getUser } from "../../../../client/actions/User";
import { getGroup } from "../../../../client/actions/Group";

const ThreadPage = props => {
  const { currentUser, data } = props;

  return <Thread thread={data} currentUser={currentUser} />;
};

ThreadPage.getInitialProps = async ({ query }) => {
  const { threadid } = query;

  const data = {
    id: threadid,
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

export default ThreadPage;
