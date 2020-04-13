import React, { useState } from "react";

// Icon
import { Icon } from "@iconify/react";
import arrowLeftAlt2 from "@iconify/icons-dashicons/arrow-left-alt2";

// Components
import Group from "../../GroupCard";

// Styling
import styles from "../../GroupsPage.module.scss";

const AllGroups = ({ groups, categories, handleBack }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <div className="TopNav">
        <button className="Back" onClick={handleBack} type="button">
          <Icon icon={arrowLeftAlt2} />
        </button>
        <h3 className="Text">Category</h3>
        <div />
      </div>

      <div className={styles.AllGroupsPage}>
        <div className={styles.AllGroupsContainer}>
          <div className={styles.CategoryBar}>
            {categories.map(name => (
              <button
                key={name}
                className={
                  name !== selectedCategory
                    ? styles.CategoryPill
                    : `${styles.CategoryPillSelected} ${styles.CategoryPill}`
                }
                onClick={() => setSelectedCategory(name)}
                type="button"
              >
                <p
                  className={
                    name !== selectedCategory
                      ? styles.CategoryName
                      : `${styles.CategoryNameSelected} ${styles.CategoryName}`
                  }
                >
                  {name}
                </p>
              </button>
            ))}
          </div>

          <div className={styles.GroupsList}>
            {groups
              .filter(
                group =>
                  selectedCategory === "All" ||
                  group.category === selectedCategory
              )
              .map(group => (
                <Group key={group.id} info={group} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllGroups;
