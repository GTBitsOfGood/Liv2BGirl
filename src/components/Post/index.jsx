import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../utils/urls";
import { approvePost, deletePost } from "../../actions/Post";
import { avatarImg, colorArr } from "../../../utils/avatars";
import { timeSince } from "../ThreadComment/utils";
import styles from "./Post.module.scss";
import ActionModal from "../ActionModal";
import DetailedTextField from "../DetailedTextField";
//import { unreportThread } from "../../../../actions/AskMeThread.js";

const Post = ({ currentUser, post }) => {
   
  const actionButtons = [];

  if (
    post.createdBy._id === currentUser._id ||
    ["Admin", "Ambassador"].includes(currentUser.role)
  ) {
    actionButtons.push({
      title: "Delete Comment",
      action: () =>
        deletePost(null, post._id).then(() => Router.reload()),
    });
  }

  if (currentUser.role === "Admin" && post.approved === false) {
    actionButtons.push({
<<<<<<< HEAD
      title: "Report Comment",
=======
      title: "Approve Comment",
>>>>>>> parent of f11f232... further post updates
      action: () =>
        approvePost(null, post._id).then(() => Router.reload()),
    });
  }

  return (
    <div className={styles.Post}>
      {actionButtons.length > 0 && <ActionModal buttons={actionButtons} />}
      <div className={styles.Details}>
<<<<<<< HEAD
        <Link
          href={urls.pages.app.profile.view()}
          as={urls.pages.app.profile.view(post.createdBy._id)}
        >
=======
>>>>>>> parent of f11f232... further post updates
          <div className={styles.Author}>
            <div
              className={styles.Avatar}
              style={{
                backgroundColor: colorArr[post.createdBy.avatarColor],
              }}
            >
              <img
                className={styles.AvatarImg}
                src={avatarImg[post.createdBy.avatar]}
                alt="Author Avatar"
              />
            </div>
            <div className={styles.NameSection}>
<<<<<<< HEAD
              <h5 className={styles.Name}>{post.createdBy.username}</h5>
=======
              <h5 className={styles.Name}>{post.createdBy._id}</h5>
>>>>>>> parent of f11f232... further post updates
            </div>
          </div>
        </Link>
        <h6
          className={styles.Date}
          title={new Date(post.createdAt).toLocaleString()}
        >
          {`~${timeSince(post.createdAt)} ago`}
        </h6>
      </div>
      {<DetailedTextField
        readOnly={true}
        textNodes={
          post.content != null && post.content.length > 0
            ? JSON.parse(post.content)
            : null
        }
      />}
      <button
        type="button"
        className={styles.CommentReply}
        onClick={() => setReply(`@${post.createdBy.username} `)}
      >
        <h5>Reply</h5>
      </button>
    </div>
  );
 };

//return bookmarks.map((question) => (
// <QuestionCard key={question._id} question={question} />
// ));

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  }).isRequired,
};

export default Post;