import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Icon } from "@iconify/react";
import updateIcon from "@iconify/icons-dashicons/update";
import urls from "../../../../../utils/urls";
import styles from "../GroupsPage.module.scss";

const ExploreGroups = ({
  categories,
  likeableGroups,
  handleRefresh,
  setSearchCategory,
}) => (
  <div className={styles.ExploreGroups}>
    <div className={styles.CategoryContainer}>
      <h2 className={styles.CategoryHeader}>Category</h2>
      <div className={styles.CategoryGroups}>
        {categories.map((category, i) => (
          <div
            role="button"
            tabIndex={0 - i}
            key={category._id}
            className={styles.CategoryType}
            onClick={() => setSearchCategory(category)}
            onKeyDown={() => setSearchCategory(category)}
          >
            <div
              className={styles.CategoryImage}
              style={{
                backgroundImage: `url("${category.iconUrl}")`,
              }}
            />
            <p className={styles.CategoryTitle}>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.MayLikeContainer}>
      <div className={styles.MayLikeHeader}>
        <h2 className={styles.MayLikeHeaderText}>Groups you may like</h2>
        <button
          className={styles.MayLikeHeaderRefresh}
          onClick={handleRefresh}
          type="button"
        >
          <Icon icon={updateIcon} />
        </button>
      </div>

      <div className={styles.MayLikeGroups}>
        {likeableGroups.map((group) => (
          <Link
            key={group.id}
            href={urls.pages.app.groups.group.view()}
            as={urls.pages.app.groups.group.view(group.id)}
            prefetch={false}
          >
            <div className={styles.MayLikeType}>
              <div className={styles.MayLikeImage} />
              <p className={styles.MayLikeTitle}>{group.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div className={styles.NotFoundText}>
      <h6>Couldn’t find what you want?</h6>
      <Link href={urls.pages.app.groups.newGroup}>
        <div>
          <h6 className={styles.CreateText}>Create a Group</h6>
        </div>
      </Link>
    </div>
  </div>
);

ExploreGroups.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
    })
  ).isRequired,
  likeableGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      admin: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  handleRefresh: PropTypes.func.isRequired,
  setSearchCategory: PropTypes.func.isRequired,
};

export default ExploreGroups;
