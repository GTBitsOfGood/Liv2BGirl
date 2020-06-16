import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "./Group.module.scss";
import urls from "../../../../../utils/urls";

const Group = ({ _id, name, people, description }) => (
  <Link
    href={urls.pages.app.groups.group.view()}
    as={urls.pages.app.groups.group.view(_id)}
    prefetch={false}
  >
    <div className={styles.GroupCard}>
      <div className={styles.Icon} />
      <div className={styles.Info}>
        <h6 className={styles.Name}>{name}</h6>
        <p className={styles.MemberCount}>
          {people}
          {people === 1 ? ` person` : ` people`}
        </p>
      </div>
      <p className={styles.Description}>{description}</p>
    </div>
  </Link>
);

Group.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  people: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Group;
