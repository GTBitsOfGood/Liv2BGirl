import React from "react";
import clsx from "clsx";
import Group from "./Group";
import classes from "./AllGroups.module.scss";

const AllGroups = ({ groups, handleBack }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categoryNames = new Set([
    "All",
    ...groups.map(group => group.category),
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.navBar}>
        <button
          className={classes.navBarArrow}
          onClick={handleBack}
          type="button"
        >
          {"<"}
        </button>
        <h1 className={classes.navBarText}>Category</h1>
      </div>

      <div className={classes.categoryBar}>
        {[...categoryNames].map(name => (
          <button
            key={name}
            className={clsx(
              classes.categoryPill,
              name === selectedCategory && classes.categoryPillSelected
            )}
            onClick={() => setSelectedCategory(name)}
            type="button"
          >
            <p
              className={clsx(
                classes.categoryName,
                name === selectedCategory && classes.categoryNameSelected
              )}
            >
              {name}
            </p>
          </button>
        ))}
      </div>

      <div className={classes.groupsList}>
        {groups
          .filter(
            group =>
              selectedCategory === "All" || group.category === selectedCategory
          )
          .map(group => (
            <Group key={group.name} info={group} />
          ))}
      </div>
    </div>
  );
};

export default AllGroups;
