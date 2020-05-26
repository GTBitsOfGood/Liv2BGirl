import React from "react";
import { useRouter } from "next/router";

import ViewGroup from "../../../client/components/Group/View";

const GroupPage = ({ currentUser }) => {
  const router = useRouter();
  const { groupid } = router.query;

  return <ViewGroup groupid={groupid} currentUser={currentUser} />;
};

GroupPage.showTopNav = true;
GroupPage.showTopNav = true;

export default GroupPage;
