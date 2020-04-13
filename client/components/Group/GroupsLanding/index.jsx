import React, { useState, useEffect } from "react";

// Icons
import { Icon } from "@iconify/react";
import searchIcon from "@iconify/icons-dashicons/search";

// Components
import ExploreGroups from "./ExploreGroups";
import SearchGroups from "./SearchGroups";
import MyGroups from "./MyGroups";

// Icons

// Styling
import styles from "./GroupsPage.module.scss";

const GroupsList = props => {
  const { currentUser } = props;
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showOwnGroups, setShowOwnGroups] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ownGroups, setOwnGroups] = useState([]);
  const [likeGroups, setLikeGroups] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setOwnGroups(currentUser.groups);
    }
    // Get categories
    // Get own groups
    // Get likeable groups
  }, []);

  const handleRefresh = () => {
    // Get more likeable groups
  };

  return (
    <>
      <div className="TopNav">
        <div className="Avatar" />
        <div />
        <div />
      </div>
      <div className={styles.GroupsPage}>
        <div className={styles.ControlBar}>
          <div className={styles.SearchContainer}>
            <div className={styles.SearchBar}>
              <Icon icon={searchIcon} className={styles.SearchIcon} />
              <input
                className={styles.SearchInput}
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
                className={styles.SearchCancel}
                onClick={() => {
                  setSearch("");
                  setSearchActive(false);
                }}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        {search.length === 0 && (
          <div className={styles.TypeBar}>
            <button
              className={
                showOwnGroups
                  ? styles.TypeButton
                  : `${styles.TypeButtonSelected} ${styles.TypeButton}`
              }
              onClick={() => {
                setShowOwnGroups(false);
                setSearchActive(false);
              }}
              type="button"
            >
              <h4>Explore Groups</h4>
            </button>
            <button
              className={
                !showOwnGroups
                  ? styles.TypeButton
                  : `${styles.TypeButtonSelected} ${styles.TypeButton}`
              }
              onClick={() => {
                setShowOwnGroups(true);
                setSearchActive(false);
              }}
              type="button"
            >
              <h4>My Groups</h4>
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
            setSearch={setSearch}
          />
        )}
      </div>
    </>
  );
};

export default GroupsList;
