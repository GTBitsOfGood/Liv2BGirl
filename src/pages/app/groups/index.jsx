import React from "react";
import PropTypes from "prop-types";
import GroupsList from "../../../components/Group/GroupsLanding";
import { getCurrentUser } from "../../../actions/User";
import { getGroup } from "../../../actions/Group";
import { getCategories } from "../../../actions/GroupCategory";

const GroupsPage = ({ categories, ownGroups }) => (
  <GroupsList categories={categories} ownGroups={ownGroups} />
);

GroupsPage.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  const categories = await getCategories(cookies);

  const user = await getCurrentUser(cookies);
  const ownGroups = await Promise.all(
    user.groups.map((groupId) => getGroup(cookies, groupId))
  );

  return {
    categories,
    ownGroups,
  };
};

GroupsPage.propTypes = {
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
  ).isRequired,
};

GroupsPage.showTopNav = true;
GroupsPage.showBottomNav = true;

export default GroupsPage;
