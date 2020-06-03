import React from "react";
import PropTypes from "prop-types";

// Component
import Profile from "../../../client/components/Profile";

// API Call
import { getUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const ProfilePage = ({ error, user, userGroups }) => {
  if (error != null) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return <Profile user={user} userGroups={userGroups} />;
};

ProfilePage.getInitialProps = async ({ query }) => {
  const userId = query.userid;

  return getUser(userId)
    .then(async user => {
      const userGroups = await Promise.all(
        user.groups.map(groupId => getGroup(groupId))
      );

      return {
        user,
        userGroups,
      };
    })
    .catch(error => ({
      error: error.message,
    }));
};

ProfilePage.propTypes = {
  error: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    subscriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
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
