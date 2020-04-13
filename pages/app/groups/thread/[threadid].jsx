import React from "react";
import { useRouter } from "next/router";

import Thread from "../../../../client/components/Group/Thread";

const ThreadPage = props => {
  const router = useRouter();
  const { threadid } = router.query;
  const { currentUser } = props;

  return <Thread threadid={threadid} currentUser={currentUser} />;
};

ThreadPage.getInitialProps = () => {
  getThread(threadid).then(res => {
    if (res) {
      setThreadData(res);

      getUser(res.posterId).then(user => {
        if (user) setAuthor(user.username);
      });

      getGroup(res.groupId).then(group => {
        if (group) setGroup(group.name);
      });

      getCommentsByThread(res._id).then(comments => {
        if (comments) {
          setComments(comments);
        }
      });
    }
  });
}

export default ThreadPage;
