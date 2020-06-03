import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import { avatarImg, colorArr } from "../../../../../utils/avatars";
import styles from "../thread.module.scss";

const CommentPage = ({ author, date, text, setReply }) => (
  <div className={`Page ${styles.CommentPg}`}>
    <div className={styles.CommentDetails}>
      <div
        className={styles.CommentAuthorAvatar}
        style={{
          backgroundColor: colorArr[author.avatarColor],
        }}
      >
        <img
          className={styles.AuthorAvatarImg}
          src={avatarImg[author.avatar]}
          alt="Comment Author Avatar"
        />
      </div>
      <div>
        <Link href={urls.pages.app.profile(author._id)}>
          <div>
            <h5 className={styles.CommentAuthor}>{author.username}</h5>
          </div>
        </Link>
        <h6 className={styles.CommentDate}>
          {new Date(date).toLocaleString()}
        </h6>
      </div>
    </div>
    <h4 className={styles.CommentText}>{text}</h4>
    <button
      type="button"
      className={styles.CommentReply}
      onClick={() => setReply(`@${author.username} `)}
    >
      <h5>Reply</h5>
    </button>
  </div>
);

CommentPage.propTypes = {
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setReply: PropTypes.func.isRequired,
};

export default CommentPage;
