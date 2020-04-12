import React from "react";
import Link from "next/link";

// Icon
import { Icon } from "@iconify/react";
import updateIcon from "@iconify/icons-dashicons/update";

// Styling
import styles from "../GroupsPage.module.scss";

// Navigation
import urls from "../../../../utils/urls";

const ExploreGroups = ({
  categories,
  likeableGroups,
  handleRefresh,
  setSearch,
}) => (
  <div className={styles.ExploreGroups}>
    <div className={styles.CategoryContainer}>
      <h2 className={styles.CategoryHeader}>Category</h2>

      <div className={styles.CategoryGroups}>
        {categories.map((category, i) => (
          <div
            role="button"
            tabIndex={0 - i}
            key={category.title}
            className={styles.CategoryType}
            onClick={() => setSearch(category.title)}
            onKeyDown={() => setSearch(category.title)}
          >
            <div className={styles.CategoryImage} />
            <p className={styles.CategoryTitle}>{category.title}</p>
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
        {likeableGroups.map(group => (
          <Link
            key={group.id}
            href={urls.pages.app.group(group.id)}
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
      <Link href={urls.pages.app.newGroup}>
        <>
          <h6 className={styles.CreateText}>Create a Group</h6>
        </>
      </Link>
    </div>
  </div>
);

export default ExploreGroups;
