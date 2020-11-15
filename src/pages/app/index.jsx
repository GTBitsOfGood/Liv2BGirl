import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Newsfeed from "../../components/Newsfeed";
import urls from "../../../utils/urls";
import { getApprovedPosts } from "../../actions/Post";

const AppHome = ({ currentUser, posts }) => (
  <div>
    <h2>Welcome!</h2>
    {currentUser.role === "Admin" && (
      <Link href={urls.pages.app.admin.index}>
        <a>Admin Controls</a>
      </Link>
    )}

    <Newsfeed posts={posts} />
  </div>
);

AppHome.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : null;

  try {
    console.log(await getApprovedPosts())
    const posts = await Promise.all(getApprovedPosts());

    return {
      posts,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

AppHome.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

AppHome.showTopNav = true;
AppHome.showBottomNav = true;

export default AppHome;
