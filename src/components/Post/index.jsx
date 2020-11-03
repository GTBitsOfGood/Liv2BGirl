import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../utils/urls";
import { approvePost, deletePost } from "../../actions/Post";
import { getUser } from "../../actions/User";
import { avatarImg, colorArr } from "../../../utils/avatars";
import { timeSince } from "../ThreadComment/utils";
import styles from "./Post.module.scss";
import ActionModal from "../ActionModal";
import DetailedTextField from "../DetailedTextField";
import Router from "next/router";
//import { unreportThread } from "../../../../actions/AskMeThread.js";

const Post = ({ currentUser, post }) => {
   
  console.log(post.createdBy)
  const actionButtons = [];

  if (post.createdBy._id === currentUser._id ||
    ["Admin", "Ambassador"].includes(currentUser.role)
  ) {
    actionButtons.push({
      title: "Delete Post",
      action: () =>
        deletePost(currentUser, post._id).then(() => Router.reload()),
    });
  }

  if (currentUser.role === "Admin" && post.approved === false) {
    actionButtons.push({
      title: "Approve Post",
      action: () =>
        approvePost(currentUser, post._id).then(() => Router.reload()),
    });
  }

  return (
    <div className={styles.Post}>
      {actionButtons.length > 0 && <ActionModal buttons={actionButtons} />}
      <div className={styles.Details}>
      <div className={styles.Author}>
            <div className={styles.NameSection}>
              <h5 className={styles.Name}>Posted by: <b>{post.createdBy}</b></h5>
            </div>
          </div>
        <h6
          className={styles.Date}
          title={new Date(post.createdAt).toLocaleString()}
        >
          {`~${timeSince(post.createdAt)} ago`}
        </h6>
      </div>
      {post.content}
    </div>
  );
 };

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }),
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  }).isRequired,
};

export default Post;