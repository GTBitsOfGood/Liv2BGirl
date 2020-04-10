import React from "react";
import { useRouter } from "next/router";

import Group from "../../../client/components/Group";

const GroupPage = () => {
  const router = useRouter();
  const { groupid } = router.query;

  return <Group groupid={groupid} />;
};

export default GroupPage;
