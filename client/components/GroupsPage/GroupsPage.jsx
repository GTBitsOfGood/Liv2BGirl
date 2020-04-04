import React from "react";
import clsx from "clsx";
import ExploreGroups from "./ExploreGroups";
import SearchGroups from "./SearchGroups";
import MyGroups from "./MyGroups";
import classes from "./GroupsPage.module.scss";

const GroupsPage = () => {
  const [search, setSearch] = React.useState("");
  const [ownGroups, setOwnGroups] = React.useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.controlBar}>
        <div className={classes.searchContainer}>
          <div className={classes.searchBar}>
            <p className={classes.searchIcon}>Q</p>
            <input
              className={classes.searchInput}
              placeholder="Find a group"
              onChange={event => {
                const { value } = event.target;

                setSearch(value);
              }}
              value={search}
            />
          </div>
          {search.length > 0 && (
            <button
              className={classes.searchCancel}
              onClick={() => setSearch("")}
              type="button"
            >
              Cancel
            </button>
          )}
        </div>
        <div className={classes.typeBar}>
          <button
            className={clsx(
              classes.typeButton,
              !ownGroups && classes.typeButtonSelected
            )}
            onClick={() => setOwnGroups(false)}
            type="button"
          >
            Explore Groups
          </button>
          <button
            className={clsx(
              classes.typeButton,
              ownGroups && classes.typeButtonSelected
            )}
            onClick={() => setOwnGroups(true)}
            type="button"
          >
            My Groups
          </button>
        </div>
      </div>
      {search.length > 0 ? (
        <SearchGroups searchTerm={search} ownGroups={ownGroups} />
      ) : ownGroups ? (
        <MyGroups />
      ) : (
        <ExploreGroups />
      )}
    </div>
  );
};

export default GroupsPage;
