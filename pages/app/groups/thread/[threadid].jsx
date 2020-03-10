import React from "react";
import { useRouter } from "next/router";

import GroupPage from "../../../../client/components/Group/GroupPage";

const Thread = () => {
  const router = useRouter();
  const { threadid } = router.query;

  return <GroupPage groupid={threadid} />;
};

export default Thread;
