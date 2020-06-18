import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "../../_error";
import GroupsList from "../../../components/Group/GroupsLanding";
import { getCurrentUser } from "../../../actions/User";
import { getGroup } from "../../../actions/Group";
import { getCategories } from "../../../actions/GroupCategory";

const GroupsPage = ({ error, currentUser, categories, ownGroups }) => {
  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return <GroupsList categories={categories} ownGroups={ownGroups} />;
};

GroupsPage.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  try {
    const categories = await getCategories(cookies);

    const user = await getCurrentUser(cookies);
    const ownGroups = await Promise.all(
      user.groups.map((groupId) => getGroup(cookies, groupId))
    );

    return {
      categories,
      ownGroups,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

GroupsPage.propTypes = {
  error: PropTypes.string,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
    })
  ).isRequired,
  ownGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      moderator: PropTypes.string.isRequired,
      category: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        parent: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};

GroupsPage.showTopNav = true;
GroupsPage.showBottomNav = true;

export default GroupsPage;
