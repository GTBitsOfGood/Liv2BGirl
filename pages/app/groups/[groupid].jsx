import React from "react";
import { useRouter } from "next/router";

import ViewGroup from "../../../client/components/Group/View";

const GroupPage = () => {
  const router = useRouter();
  const { groupid } = router.query;

  return <ViewGroup groupid={groupid} />;
};

export default GroupPage;
