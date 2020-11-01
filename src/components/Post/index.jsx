import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import { approvePost, deletePost } from "../../../actions/Post";
import styles from "./Post.module.scss";
//import { unreportThread } from "../../../../actions/AskMeThread.js";

const Post = ({ post }) => {
   
  const actionButtons = [];

  if (
    post.author._id === currentUser._id ||
    ["Admin", "Ambassador"].includes(currentUser.role)
  ) {
    actionButtons.push({
      title: "Delete Comment",
      action: () =>
        deletePost(null, post._id).then(() => Router.reload()),
    });
  }

  if (currentUser.role === "Admin" && post.approved === False) {
    actionButtons.push({
      title: "Report Comment",
      action: () =>
        approvePost(null, post._id).then(() => Router.reload()),
    });
  }

  return (
    <div className={styles.Comment}>
      {actionButtons.length > 0 && <ActionModal buttons={actionButtons} />}
      <div className={styles.Details}>
        <Link
          href={urls.pages.app.profile.view()}
          as={urls.pages.app.profile.view(post.author._id)}
        >
          <div className={styles.Author}>
            <div
              className={styles.Avatar}
              style={{
                backgroundColor: colorArr[comment.author.avatarColor],
              }}
            >
              <img
                className={styles.AvatarImg}
                src={avatarImg[comment.author.avatar]}
                alt="Author Avatar"
              />
            </div>
            <div className={styles.NameSection}>
              <h5 className={styles.Name}>{comment.author.username}</h5>
              {comment.officialAnswer && <h6>Official Answer</h6>}
            </div>
          </div>
        </Link>
        <h6
          className={styles.Date}
          title={new Date(comment.postedAt).toLocaleString()}
        >
          {`~${timeSince(comment.postedAt)} ago`}
        </h6>
      </div>
      <DetailedTextField
        readOnly={true}
        textNodes={
          comment.content != null && comment.content.length > 0
            ? JSON.parse(comment.content)
            : null
        }
      />
      <button
        type="button"
        className={styles.CommentReply}
        onClick={() => setReply(`@${comment.author.username} `)}
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
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  }).isRequired,
};

export default Post;