import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { avatarImg, colorArr } from "../../../../../utils/avatars";
import urls from "../../../../../utils/urls";
import styles from "../../askme.module.scss";

const Comment = ({ author, comment }) => (
  <div className={`Page ${styles.QuestionComments}`}>
    <div
      className={styles.QuestionDetails}
      onClick={() => Router.push(urls.pages.app.profile(author._id))}
      onKeyDown={() => Router.push(urls.pages.app.profile(author._id))}
    >
      <div
        className={styles.QuestionAuthorAvatar}
        style={{
          backgroundColor: colorArr[author.avatarColor],
        }}
      >
        <img
          className={styles.AuthorAvatarImg}
          src={avatarImg[author.avatar]}
          alt="Author Avatar"
        />
      </div>
      <h5 className={styles.QuestionAuthor}>{author.username}</h5>
      <h6 className={styles.QuestionDate}>
        {new Date(comment.postedAt).toLocaleString()}
      </h6>
    </div>
    <h4 className={styles.QuestionText}>{comment.content}</h4>
  </div>
);

Comment.propTypes = {
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
};

export default Comment;
