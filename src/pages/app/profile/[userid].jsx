import React from "react";
import PropTypes from "prop-types";
import Profile from "../../../components/Profile";
import ErrorPage from "../../_error";
import { getUser } from "../../../actions/User";
import { getGroup } from "../../../actions/Group";
import { getApprovedPosts } from "../../../actions/Post";

const ProfilePage = ({ currentUser, error, user, userGroups, userPosts }) => {
  let filteredUserPost = [];
  if (userPosts != null) {
    for (const post of userPosts) {
      if (post.createdBy === user._id) {
        filteredUserPost.push(post);
      }
    }
  }
  userPosts = filteredUserPost;
  if (error != null) {
    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }
  return <Profile user={user} userGroups={userGroups} userPosts={userPosts} />;
};

ProfilePage.getInitialProps = async ({ query, req }) => {
  const userId = query.userid;
  const cookies = req ? req.headers.cookie : null;

  try {
    const user = await getUser(cookies, userId);
    let posts = ["user"];
    let userPosts = await getApprovedPosts();
    const userGroups = await Promise.all(
      user.groups.map((groupId) => getGroup(cookies, groupId)),
    );
    return {
      user,
      userGroups,
      userPosts,
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
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
    })
  )
};

ProfilePage.defaultProps = {
  error: null,
  user: null,
  userGroups: null,
  userPosts: null,
};

ProfilePage.showTopNav = false;
ProfilePage.showBottomNav = true;

export default ProfilePage;
