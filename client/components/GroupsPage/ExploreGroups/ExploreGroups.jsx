import React from "react";
import Link from "next/link";
import classes from "./ExploreGroups.module.scss";
import urls from "../../../../utils/urls";

const ExploreGroups = ({ categories, likeableGroups, handleRefresh }) => (
  <div className={classes.root}>
    <div className={classes.categoryContainer}>
      <h1 className={classes.categoryHeader}>Category</h1>

      <div className={classes.categoryGroups}>
        {categories.map(category => (
          <div key={category.title} className={classes.categoryType}>
            <div className={classes.categoryImage} />
            <p className={classes.categoryTitle}>{category.title}</p>
          </div>
        ))}
      </div>
    </div>
    <div className={classes.mayLikeContainer}>
      <div className={classes.mayLikeHeader}>
        <h1 className={classes.mayLikeHeaderText}>Groups you may like</h1>
        <button
          className={classes.mayLikeHeaderRefresh}
          onClick={handleRefresh}
          type="button"
        >
          O
        </button>
      </div>

      <div className={classes.mayLikeGroups}>
        {likeableGroups.map(group => (
          <Link
            key={group.id}
            href={urls.pages.app.group(group.id)}
            prefetch={false}
          >
            <div className={classes.mayLikeType}>
              <div className={classes.mayLikeImage} />
              <p className={classes.mayLikeTitle}>{group.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <p className={classes.notFoundText}>
      {"Couldn't find what you want? "}
      <a className={classes.createText} href={urls.pages.app.newGroup}>
        Create a Group
      </a>
    </p>
  </div>
);

export default ExploreGroups;
