import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// API Call
import { getUser } from "../../../../actions/User";

// Stylings
import styles from "../thread.module.scss";

const CommentPage = props => {
  const { authorid, date, text } = props;
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getUser(authorid).then(user => {
      if (user) setAuthor(user.username);
    });
  }, []);

  return (
    <div className={`Page ${styles.CommentPg}`}>
      <div className={styles.CommentDetails}>
        <img
          className={styles.CommentAuthorAvatar}
          src="https://picsum.photos/50/50"
          alt="Group Avatar"
        />
        <div>
          <h5 className={styles.CommentAuthor}>{author}</h5>
          <h6 className={styles.CommentDate}>{date}</h6>
        </div>
      </div>
      <h4 className={styles.CommentText}>{text}</h4>
      <button type="button" className={styles.CommentReply}>
        <h5>Reply</h5>
      </button>
    </div>
  );
};

CommentPage.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CommentPage;
