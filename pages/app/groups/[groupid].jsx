import React from "react";
import { getGroup } from "../../../client/actions/Group";
import { getGroupThreads } from "../../../client/actions/Thread";
import ViewGroup from "../../../client/components/Group/View";

const GroupPage = ({ error, currentUser, groupid, groupData, threads }) => {
  if (error) {
    console.error("error", error);

    return (
      <div>
        <h2>Group not found :(</h2>
      </div>
    );
  }

  return (
    <ViewGroup
      currentUser={currentUser}
      groupid={groupid}
      groupData={groupData}
      threads={threads}
    />
  );
};

GroupPage.getInitialProps = async ({ query }) => {
  const { groupid } = query;

  try {
    const groupData = await getGroup(groupid);
    const threads = await getGroupThreads(groupid);

    return {
      groupid,
      groupData,
      threads,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

GroupPage.showTopNav = false;
GroupPage.showBottomNav = true;

export default GroupPage;
