import React from "react";
import PropTypes from "prop-types";
import Group from "../../GroupCard";
import styles from "../../GroupsPage.module.scss";
import TopNavBar from "../../../../TopNavBar";

const AllGroups = ({ groups, categories, handleBack }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleSelection = (category) =>
    setSelectedCategory((prevCategory) => {
      if (prevCategory === category) {
        return null;
      }

      return category;
    });

  return (
    <div className={styles.AllGroupsPage}>
      <div className={styles.AllGroupsWrapper}>
        <TopNavBar backAction={handleBack} title="Category" />
        <div className={styles.AllGroupsContainer}>
          <div className={styles.CategoryBar}>
            {categories.map((category) => (
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
                (group) =>
                  selectedCategory == null ||
                  group.category._id === selectedCategory
              )
              .map((group) => (
                <Group key={group._id} {...group} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

AllGroups.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      moderator: PropTypes.string.isRequired,
      category: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        parent: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
    })
  ).isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default AllGroups;
