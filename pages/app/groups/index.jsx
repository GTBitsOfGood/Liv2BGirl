import React from "react";
import GroupsList from "../../../client/components/Group/GroupsLanding";

const GroupsPage = props => {
  const { currentUser } = props;

  return <GroupsList currentUser={currentUser} />;
};

export default GroupsPage;
