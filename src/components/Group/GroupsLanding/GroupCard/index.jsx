import React from "react";
import Link from "next/link";
import styles from "./Group.module.scss";
import urls from "../../../../../utils/urls";

const Group = ({ info }) => {
  const { _id, name, people, description } = info;

  return (
    <Link href={urls.pages.app.group(_id)} prefetch={false}>
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
};

export default Group;
