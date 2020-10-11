import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import ActionModal from "../ActionModal";
import DetailedTextField from "../DetailedTextField";
import { timeSince } from "./utils";
import { deleteComment } from "../../actions/Comment";
import { reportComment } from "../../actions/Comment";
import urls from "../../../utils/urls";
import { avatarImg, colorArr } from "../../../utils/avatars";
import styles from "./ThreadComment.module.scss";

const ThreadComment = ({ comment, setReply, currentUser }) => {
  const actionButtons = [];

  if (
    comment.author._id === currentUser._id ||
    ["Admin", "Ambassador"].includes(currentUser.role)
  ) {
    actionButtons.push({
      title: "Delete Comment",
      action: () =>
        deleteComment(null, comment._id).then(() => Router.reload()),
    });
  }

  if (comment.author._id != currentUser._id && currentUser.role == "User") {
    actionButtons.push({
      title: "Report Comment",
      action: () =>
        reportComment(null, comment._id).then(() => Router.reload()),
    });
  }

  return (
    <div className={styles.Comment}>
      {actionButtons.length > 0 && <ActionModal buttons={actionButtons} />}
      <div className={styles.Details}>
        <Link
          href={urls.pages.app.profile.view()}
          as={urls.pages.app.profile.view(comment.author._id)}
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

ThreadComment.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    officialAnswer: PropTypes.bool.isRequired,
    postedAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setReply: PropTypes.func.isRequired,
};

export default ThreadComment;
