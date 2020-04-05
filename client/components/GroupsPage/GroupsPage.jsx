import React from "react";
import clsx from "clsx";
import ExploreGroups from "./ExploreGroups";
import SearchGroups from "./SearchGroups";
import MyGroups from "./MyGroups";
import classes from "./GroupsPage.module.scss";
import loadingData from "./loadingData";

const GroupsPage = () => {
  const [search, setSearch] = React.useState("");
  const [searchActive, setSearchActive] = React.useState(false);
  const [showOwnGroups, setShowOwnGroups] = React.useState(false);
  const [categories, setCategories] = React.useState(loadingData.categories);
  const [ownGroups, setOwnGroups] = React.useState(loadingData.groups);
  const [likeGroups, setLikeGroups] = React.useState(
    loadingData.groups.slice(0, 4)
  );

  React.useEffect(() => {
    // Get categories
    // Get own groups
    // Get likeable groups
  }, []);

  const handleRefresh = () => {
    // Get more likeable groups
  };

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
              onFocus={() => setSearchActive(true)}
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
      </div>
      {search.length === 0 && (
        <div className={classes.typeBar}>
          <button
            className={clsx(
              classes.typeButton,
              !showOwnGroups && classes.typeButtonSelected
            )}
            onClick={() => {
              setShowOwnGroups(false);
              setSearchActive(false);
            }}
            type="button"
          >
            Explore Groups
          </button>
          <button
            className={clsx(
              classes.typeButton,
              showOwnGroups && classes.typeButtonSelected
            )}
            onClick={() => {
              setShowOwnGroups(true);
              setSearchActive(false);
            }}
            type="button"
          >
            My Groups
          </button>
        </div>
      )}
      {search.length > 0 || searchActive ? (
        <SearchGroups searchTerm={search} likeableGroups={likeGroups} />
      ) : showOwnGroups ? (
        <MyGroups groups={ownGroups} />
      ) : (
        <ExploreGroups
          categories={categories}
          likeableGroups={likeGroups}
          handleRefresh={handleRefresh}
        />
      )}
    </div>
  );
};

export default GroupsPage;
