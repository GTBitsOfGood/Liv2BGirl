import React from "react";
import PropTypes from "prop-types";
import Profile from "../../../components/Profile";
import ErrorPage from "../../_error";
import { getUser } from "../../../actions/User";
import { getGroup } from "../../../actions/Group";

const ProfilePage = ({ currentUser, error, user, userGroups }) => {
  if (error != null) {
    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return <Profile user={user} userGroups={userGroups} />;
};

ProfilePage.getInitialProps = async ({ query, req }) => {
  const userId = query.userid;
  const cookies = req ? req.headers.cookie : null;

  try {
    const user = await getUser(cookies, userId);
    const userGroups = await Promise.all(
      user.groups.map((groupId) => getGroup(cookies, groupId))
    );

    return {
      user,
      userGroups,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

ProfilePage.propTypes = {
  error: PropTypes.string,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
    groupBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  userGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

ProfilePage.defaultProps = {
  error: null,
  user: null,
  userGroups: null,
};

ProfilePage.showTopNav = false;
ProfilePage.showBottomNav = true;

export default ProfilePage;
