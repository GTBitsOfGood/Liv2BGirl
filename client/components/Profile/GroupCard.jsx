import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Styling
import styles from "./profile.module.scss";

const GroupCard = props => {
  const { title, description, image } = props;

  return (
    <Link href={`/app/groups/${title}`}>
      <button type="button" className={styles.GroupCard}>
        <img className={styles.GroupAvatar} src={image} alt="Group Pic" />
        <div className={styles.GroupInfo}>
          <h3 className={styles.GroupName}>{title}</h3>
          <h3 className={styles.GroupDescription}>{description}</h3>
        </div>
      </button>
    </Link>
  );
};

GroupCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default GroupCard;
