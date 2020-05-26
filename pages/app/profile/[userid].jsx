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
        <h1>User not found :</h1>
      </div>
    );
  }

  return <Profile user={user} />;
};

ProfilePage.getInitialProps = async ({ query }) => {
  const userId = query.userid;

  return getUser(userId).then(async user => {
    user.groups = await Promise.all(
      user.groups.map(groupId => getGroup(groupId))
    );

    return {
      user,
    };
  });
};

ProfilePage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    groups: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

ProfilePage.showTopNav = false;
ProfilePage.showBottomNav = true;

export default ProfilePage;
