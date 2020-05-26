import React from "react";
import PropTypes from "prop-types";

// Components
import GroupsList from "../../../client/components/Group/GroupsLanding";

// API Calls
import { getCurrentUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const GroupsPage = ({ currentUser, ownGroups }) => {
  return <GroupsList loggedIn={currentUser != null} ownGroups={ownGroups} />;
};

GroupsPage.getInitialProps = async ({ req }) => {
  const props = {};

  const cookies = req ? req.headers.cookie : null;

  const user = await getCurrentUser(cookies);

  if (user != null) {
    props.ownGroups = await Promise.all(
      user.groups.map(groupId => getGroup(groupId))
    );
  } else {
    props.ownGroups = [];
  }

  return props;
};

GroupsPage.propTypes = {
  currentUser: PropTypes.object,
  ownGroups: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    admin: PropTypes.string.isRequired,
  }).isRequired,
};

GroupsPage.defaultProps = {
  currentUser: null,
};

GroupsPage.showTopNav = true;
GroupsPage.showBottomNav = true;

export default GroupsPage;
