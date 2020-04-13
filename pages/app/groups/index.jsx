import React from "react";

// Components
import GroupsList from "../../../client/components/Group/GroupsLanding";

// API Calls
import { getCurrentUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const GroupsPage = ({ ownGroups }) => {
  return <GroupsList ownGroups={ownGroups} />;
};

GroupsPage.getInitialProps = async ({ req, query }) => {
  const props = {};

  const cookies = req ? req.headers.cookie : null;

  await getCurrentUser(cookies).then(async user => {
    props.ownGroups = await Promise.all(
      user.groups.map(groupId => getGroup(groupId))
    );
  });

  return props;
};

export default GroupsPage;
