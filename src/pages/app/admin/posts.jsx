import React from "react";
import ErrorPage from "../../_error";
import { getCurrentUser } from "../../../actions/User";
import PostsPage from "../../../components/Admin/Posts";
import PropTypes from "prop-types";
import { getPendingPosts } from "../../../actions/Post";
import urls from "../../../../utils/urls";
import Router from "next/router";

const Posts = ({ error, currentUser, p }) => {
  console.log(p);

  if (error) {
    console.error("error", error);

    return (
      <ErrorPage currentUser={currentUser} statusCode={500} message={error} />
    );
  }

  return (
    <PostsPage
      currentUser={currentUser}
      Posts={p}
    />
  );
};

Posts.getInitialProps = async ({ req, res }) => {
  const cookies = req ? req.headers.cookie : null;
  console.log(cookies);
  try {
    const p = await getPendingPosts(cookies);
    const currentUser = await getCurrentUser(cookies).catch(() => null);

    console.log(currentUser);

    return {
      p,
      currentUser,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

const QuestionType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
}).isRequired;

Posts.propTypes = {
  error: PropTypes.string,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  featuredQuestions: PropTypes.arrayOf(QuestionType),
  ownQuestions: PropTypes.arrayOf(QuestionType),
  bookmarks: PropTypes.arrayOf(QuestionType),
};

Posts.defaultProps = {
  error: null,
  featuredQuestions: null,
  ownQuestions: null,
  bookmarks: null,
};

Posts.showTopNav = true;
Posts.showBottomNav = true;

export default Posts;
