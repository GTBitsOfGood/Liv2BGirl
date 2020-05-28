import React from "react";
import PropTypes from "prop-types";

// Component
import Profile from "../../../client/components/Profile";

// API Call
import { getUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const ProfilePage = ({ user }) => {
  if (user == null) {
    return (
      <div>
        <h1>User not found :(</h1>
      </div>
    );
  }

  return <Profile user={user} />;
};

ProfilePage.getInitialProps = async ({ query }) => {
  const userId = query.userid;

  return getUser(userId).then(async user => {
    const groups = await Promise.all(
      user.groups.map(groupId => getGroup(groupId))
    );

    return {
      ...user,
      groups,
    };
  });
};

ProfilePage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
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
};

ProfilePage.defaultProps = {
  user: null,
};

ProfilePage.showTopNav = false;
ProfilePage.showBottomNav = true;

export default ProfilePage;
