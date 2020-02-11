import React from "react";
import { useRouter } from "next/router";

import ProfilePage from "../../frontend/components/Profile/ProfilePage";

const Profile = () => {
  const router = useRouter();
  const { userid } = router.query;

  return <ProfilePage userid={userid} />;
};

export default Profile;
