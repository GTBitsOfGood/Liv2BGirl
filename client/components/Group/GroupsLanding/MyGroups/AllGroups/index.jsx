import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import arrowLeftAlt2 from "@iconify/icons-dashicons/arrow-left-alt2";
import Group from "../../GroupCard";
import styles from "../../GroupsPage.module.scss";

const AllGroups = ({ groups, categories, handleBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelection = category =>
    setSelectedCategory(prevCategory => {
      if (prevCategory === category) {
        return null;
      }

      return category;
    });

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
            {categories.map(category => (
              <button
                key={category._id}
                className={
                  category._id !== selectedCategory
                    ? styles.CategoryPill
                    : `${styles.CategoryPillSelected} ${styles.CategoryPill}`
                }
                onClick={() => handleSelection(category._id)}
                type="button"
              >
                <p
                  className={
                    category._id !== selectedCategory
                      ? styles.CategoryName
                      : `${styles.CategoryNameSelected} ${styles.CategoryName}`
                  }
                >
                  {category.name}
                </p>
              </button>
            ))}
          </div>

          <div className={styles.GroupsList}>
            {groups
              .filter(
                group =>
                  selectedCategory == null ||
                  group.category._id === selectedCategory
              )
              .map(group => (
                <Group key={group._id} info={group} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

AllGroups.propTypes = {
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
  handleBack: PropTypes.func.isRequired,
};

export default AllGroups;
