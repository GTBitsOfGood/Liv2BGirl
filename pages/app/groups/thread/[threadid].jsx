import React from "react";
import { useRouter } from "next/router";

import ThreadPage from "../../../../client/components/Group/Thread/ThreadPage";

const Thread = () => {
  const router = useRouter();
  const { threadid } = router.query;

  return (
    <ThreadPage
      threadid={threadid}
      author="username"
      date="00-00-0000 00:00"
      groupid="group name"
    />
  );
};

export default Thread;
