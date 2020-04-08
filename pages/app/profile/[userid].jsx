import React from "react";
import ProfilePage from "../../../client/components/Profile/ProfilePage";
import { getUser } from "../../../client/actions/User";
import { getGroup } from "../../../client/actions/Group";

const Profile = ({ user }) => {
  if (user == null) {
    return (
      <div>
        <h1>User not found :(</h1>
      </div>
    );
  }

  return <ProfilePage user={user} />;
};

Profile.getInitialProps = async ({ query }) => {
  const userId = query.userid;

  return getUser(userId).then(async user => {
    user.groups = await Promise.all(user.groups.map((groupId) => getGroup(groupId)));

    return {
      user,
    };
  });
};

export default Profile;
