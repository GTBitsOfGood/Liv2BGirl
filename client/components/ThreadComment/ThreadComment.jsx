import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { timeSince } from "./utils";
import urls from "../../../utils/urls";
import { avatarImg, colorArr } from "../../../utils/avatars";
import styles from "./ThreadComment.module.scss";

const ThreadComment = ({ author, comment, setReply }) => (
  <div className={styles.Comment}>
    <div className={styles.Details}>
      <Link href={urls.pages.app.profile(author._id)}>
        <div className={styles.Author}>
          <div
            className={styles.Avatar}
            style={{
              backgroundColor: colorArr[author.avatarColor],
            }}
          >
            <img
              className={styles.AvatarImg}
              src={avatarImg[author.avatar]}
              alt="Author Avatar"
            />
          </div>
          <div className={styles.NameSection}>
            <h5 className={styles.Name}>{author.username}</h5>
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
    <h4 className={styles.Text}>{comment.content}</h4>
    <button
      type="button"
      className={styles.CommentReply}
      onClick={() => setReply(`@${author.username} `)}
    >
      <h5>Reply</h5>
    </button>
  </div>
);

ThreadComment.propTypes = {
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    officialAnswer: PropTypes.bool.isRequired,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
  setReply: PropTypes.func.isRequired,
};

export default ThreadComment;
