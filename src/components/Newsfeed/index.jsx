import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Post } from "../Post";
import { getApprovedPosts } from "../../actions/Post";
import { approvePost, deletePost } from "../../actions/Post";
import { avatarImg, colorArr } from "../../../utils/avatars";
import { timeSince } from "../ThreadComment/utils";
// import { render } from "node-sass";

const Newsfeed = ({ posts }) => {
  return (
    <div>
      {
        <ol>
          {posts.map((post) => (
            <li key={post._id} align="start">
              <div>
                <p> {post.createdBy.username}</p>
                <p>{post.content}</p>
                <p> {post.createdAt} </p>
              </div>
            </li>
          ))}
        </ol>
      }
    </div>
  );
};

Newsfeed.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Newsfeed;
