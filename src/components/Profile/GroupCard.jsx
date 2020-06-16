import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import urls from "../../../utils/urls";
import styles from "./profile.module.scss";

const GroupCard = ({ id, title, description, image }) => (
  <Link
    href={urls.pages.app.groups.group.view()}
    as={urls.pages.app.groups.group.view(id)}
    prefetch={false}
  >
    <button type="button" className={styles.GroupCard}>
      <img className={styles.GroupAvatar} src={image} alt="Group Pic" />
      <div className={styles.GroupInfo}>
        <h3 className={styles.GroupName}>{title}</h3>
        <h3 className={styles.GroupDescription}>{description}</h3>
      </div>
    </button>
  </Link>
);

GroupCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default GroupCard;
