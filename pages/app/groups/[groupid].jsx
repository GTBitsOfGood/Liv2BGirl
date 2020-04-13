import React from "react";
import { useRouter } from "next/router";

import ViewGroup from "../../../client/components/Group/View";

const GroupPage = ({ currentUser }) => {
  const router = useRouter();
  const { groupid } = router.query;

  return <ViewGroup groupid={groupid} currentUser={currentUser} />;
};

export default GroupPage;
