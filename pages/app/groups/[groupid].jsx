import React from "react";
import { useRouter } from "next/router";

import GroupPage from "../../../client/components/GroupPage";

const Group = () => {
  const router = useRouter();
  const { groupid } = router.query;

  return <GroupPage groupid={groupid} />;
};

export default Group;
