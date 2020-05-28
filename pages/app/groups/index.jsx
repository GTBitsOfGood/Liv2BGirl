import React from "react";
import PropTypes from "prop-types";

// Components
import GroupsList from "../../../client/components/Group/GroupsLanding";

// API Calls
import { getCurrentUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";
import { getCategories } from "../../../client/actions/Categories";

const GroupsPage = ({ currentUser, categories, ownGroups }) => {
  return (
    <GroupsList
      loggedIn={currentUser != null}
      categories={categories}
      ownGroups={ownGroups}
    />
  );
};

GroupsPage.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  const user = await getCurrentUser(cookies);
  const categories = await getCategories();

  let ownGroups = [];
  if (user != null) {
    ownGroups = await Promise.all(
      user.groups.map(groupId => getGroup(groupId))
    );
  }

  return {
    categories,
    ownGroups,
  };
};

GroupsPage.propTypes = {
  currentUser: PropTypes.object,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parentId: PropTypes.string,
    })
  ).isRequired,
  ownGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        parentId: PropTypes.string,
      }).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      admin: PropTypes.string.isRequired,
    })
  ),
};

GroupsPage.defaultProps = {
  currentUser: null,
  ownGroups: [],
};

GroupsPage.showTopNav = true;
GroupsPage.showBottomNav = true;

export default GroupsPage;
