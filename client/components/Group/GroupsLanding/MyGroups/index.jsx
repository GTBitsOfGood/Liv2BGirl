import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Icon } from "@iconify/react";
import arrowRightAlt2 from "@iconify/icons-dashicons/arrow-right-alt2";
import AllGroups from "./AllGroups";
import urls from "../../../../../utils/urls";
import styles from "../GroupsPage.module.scss";

const MyGroups = ({ groups, categories }) => {
  const [showAll, setShowAll] = useState(false);

  if (showAll) {
    return (
      <AllGroups
        categories={categories}
        groups={groups}
        handleBack={() => setShowAll(false)}
      />
    );
  }

  return (
    <div className={styles.MyGroupsPage}>
      <div className={styles.MyGroupsContainer}>
        <div className={styles.MyGroupsHeader}>
          <h2 className={styles.MyGroupsHeaderText}>My Groups</h2>
          {groups && (
            <button
              className={styles.MyGroupsButton}
              onClick={() => setShowAll(true)}
              type="button"
            >
              <h6>All</h6>
              <Icon icon={arrowRightAlt2} />
            </button>
          )}
        </div>

        <div className={styles.MyGroupsGroups}>
          {groups.slice(0, 4).map(group => (
            <Link
              key={group._id}
              href={urls.pages.app.group(group._id)}
              prefetch={false}
            >
              <div className={styles.MyGroupType}>
                <div className={styles.MyGroupImage} />
                <p className={styles.MyGroupTitle}>{group.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

MyGroups.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        parentId: PropTypes.string,
      }).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      admin: PropTypes.string.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parentId: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default MyGroups;
