import React, { useState } from "react";
import PropTypes from "prop-types";

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

const GroupsList = ({ loggedIn, ownGroups }) => {
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showOwnGroups, setShowOwnGroups] = useState(false);
  const [likeGroups, setLikeGroups] = useState([]);

  const categories = Array.from(
    new Set(["All", ...(ownGroups.map(group => group.category) || [])])
  );

  const handleRefresh = () => {
    // Get more likeable groups
  };

  return (
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
        <SearchGroups
          searchTerm={search}
          likeableGroups={likeGroups}
          clearedSearch={() => setSearchActive(false)}
        />
      ) : showOwnGroups ? (
        <MyGroups categories={categories} groups={ownGroups} />
      ) : (
        <ExploreGroups
          categories={categories}
          likeableGroups={likeGroups}
          handleRefresh={handleRefresh}
          setSearch={setSearch}
        />
      )}
    </div>
  );
};

GroupsList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  ownGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      admin: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default GroupsList;
