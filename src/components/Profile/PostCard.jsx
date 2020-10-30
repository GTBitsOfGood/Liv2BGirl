import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import urls from "../../../utils/urls";
import styles from "./profile.module.scss";

const PostCard = ({ id, createdAt, createdBy, content, image }) => (
  <Link
    href={urls.pages.app.groups.group.view()}
    as={urls.pages.app.groups.group.view(id)}
    prefetch={false}
  >
    <button type="button" className={styles.ProfileCard}>
      <img className={styles.GroupAvatar} src={image} alt="Group Pic" />
      <div className={styles.GroupInfo}>
        <h3 className={styles.GroupName}>{createdAt}</h3>
        <h3>Author: {createdBy}</h3>
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
  image: PropTypes.string.isRequired,
};

export default PostCard;
