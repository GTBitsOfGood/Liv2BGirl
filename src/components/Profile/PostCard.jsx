import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "./profile.module.scss";

const PostCard = ({ createdAt, content }) => (
  <Link
   href={"google.com"}
    // href={urls.pages.app.posts.post.view()}
    // as={urls.pages.app.posts.post.view(id)}
    // prefetch={false}
  >
    <button type="button" className={styles.ProfileCard}>
      <div className={styles.GroupInfo}>
        <h3 className={styles.GroupName}>{createdAt}</h3>
        <h3 className={styles.GroupDescription}>{content}</h3>
      </div>
    </button>
  </Link>
);

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PostCard;