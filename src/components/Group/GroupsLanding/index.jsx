import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify/icons-dashicons/search";
import ExploreGroups from "./ExploreGroups";
import SearchGroups from "./SearchGroups";
import MyGroups from "./MyGroups";
import styles from "./GroupsPage.module.scss";

const GroupsList = ({ categories, ownGroups }) => {
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const [showOwnGroups, setShowOwnGroups] = useState(false);
  const [likeGroups, setLikeGroups] = useState([]);

  const handleRefresh = () => {
    // Get more likeable group
    setLikeGroups([]);
  };

  const handleSetTerm = (event) => {
    const { value } = event.target;

    setSearch(value);
    setSearchActive(true);
  };

  const handleSetCategory = (category) => {
    setSearchCategory(category);
    setSearchActive(true);
  };

  const handleRemoveCategory = () => {
    setSearchCategory(null);

    if (search.length === 0) {
      setSearchActive(false);
    }
  };

  const handleCancelSearch = () => {
    setSearchActive(false);
    setSearch("");
    setSearchCategory(null);
  };

  return (
    <div className={styles.GroupsPage}>
      <div className={styles.ControlBar}>
        <div className={styles.SearchContainer}>
          <div className={styles.SearchBar}>
            <Icon icon={searchIcon} className={styles.SearchIcon} />
            {searchCategory != null && (
              <button
                className={styles.CategorySelection}
                type="button"
                onClick={handleRemoveCategory}
                onKeyPress={handleRemoveCategory}
              >
                <p>{searchCategory.name}</p>
                <p className={styles.CancelButton}>X</p>
              </button>
            )}
            <input
              className={styles.SearchInput}
              placeholder="Find a group"
              onChange={handleSetTerm}
              onFocus={() => setSearchActive(true)}
              value={search}
            />
          </div>
          {searchActive && (
            <button
              className={styles.SearchCancel}
              onClick={handleCancelSearch}
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
      {searchActive ? (
        <SearchGroups
          searchTerm={search}
          searchCategory={searchCategory}
          likeableGroups={likeGroups}
        />
      ) : showOwnGroups ? (
        <MyGroups categories={categories} groups={ownGroups} />
      ) : (
        <ExploreGroups
          categories={categories}
          likeableGroups={likeGroups}
          handleRefresh={handleRefresh}
          setSearchCategory={handleSetCategory}
        />
      )}
    </div>
  );
};

GroupsList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
    })
  ).isRequired,
  ownGroups: PropTypes.arrayOf(
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
};

export default GroupsList;
