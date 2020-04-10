import React from "react";
import { useRouter } from "next/router";

import Thread from "../../../../client/components/GroupPage/Thread";

const ThreadPage = () => {
  const router = useRouter();
  const { threadid } = router.query;

  return (
    <Thread
      threadid={threadid}
      author="username"
      date="00-00-0000 00:00"
      groupid="group name"
    />
  );
};

export default ThreadPage;
