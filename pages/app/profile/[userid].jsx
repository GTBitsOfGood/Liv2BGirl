import React from "react";
import Profile from "../../../client/components/Profile";
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

export default ProfilePage;
