import React from "react";
import PropTypes from "prop-types";

// Components
import GroupsList from "../../../client/components/Group/GroupsLanding";

// API Calls
import { getCurrentUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const GroupsPage = ({ ownGroups }) => {
  return <GroupsList ownGroups={ownGroups} />;
};

GroupsPage.getInitialProps = async ({ req }) => {
  const props = {};

  const cookies = req ? req.headers.cookie : null;

  await getCurrentUser(cookies).then(async user => {
    props.ownGroups = await Promise.all(
      user.groups.map(groupId => getGroup(groupId))
    );
  });

  return props;
};

GroupsPage.propTypes = {
  ownGroups: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    admin: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupsPage;
