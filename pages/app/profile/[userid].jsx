import React from "react";
import ProfilePage from "../../../client/components/Profile/ProfilePage";
import { getUser } from "../../../client/actions/api";

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

  return getUser(userId)
    .then(user => ({
      user,
    }))
    .catch(() => ({}));
};

export default Profile;
