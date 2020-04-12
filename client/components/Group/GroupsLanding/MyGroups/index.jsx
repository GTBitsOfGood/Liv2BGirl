import React, { useState } from "react";
import Link from "next/link";

// Icon
import { Icon } from "@iconify/react";
import arrowRightAlt2 from "@iconify/icons-dashicons/arrow-right-alt2";

// Styling
import styles from "../GroupsPage.module.scss";

// Components
import AllGroups from "./AllGroups";

// Navigation
import urls from "../../../../../utils/urls";

const MyGroups = ({ groups }) => {
  const [showAll, setShowAll] = useState(false);

  if (showAll) {
    return <AllGroups groups={groups} handleBack={() => setShowAll(false)} />;
  }

  return (
    <div className={styles.MyGroupsPage}>
      <div className={styles.MyGroupsContainer}>
        <div className={styles.MyGroupsHeader}>
          <h2 className={styles.MyGroupsHeaderText}>My Groups</h2>
          <button
            className={styles.MyGroupsButton}
            onClick={() => setShowAll(true)}
            type="button"
          >
            <h6>All </h6>
            <Icon icon={arrowRightAlt2} />
          </button>
        </div>

        <div className={styles.MyGroupsGroups}>
          {groups.slice(0, 4).map(group => (
            <Link
              key={group.id}
              href={urls.pages.app.group(group.id)}
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

export default MyGroups;
