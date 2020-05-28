import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useDebounce } from "../../../../utils/hooks";
import Group from "../GroupCard";
import { searchGroups } from "../../../../actions/Group";
import urls from "../../../../../utils/urls";
import styles from "../GroupsPage.module.scss";

const SearchGroups = ({ searchTerm, searchCategory, likeableGroups }) => {
  const [groups, setGroups] = useState(likeableGroups);
  const debouncedTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    searchGroups({
      term: debouncedTerm,
      category: searchCategory ? searchCategory._id : null,
    }).then(newGroups => {
      setGroups(newGroups);
    });
  }, [debouncedTerm, searchCategory]);

  return (
    <div className={styles.SearchGroupsPage}>
      {groups.map(group => (
        <Group key={group._id} info={group} />
      ))}
      {groups.length === 0 && (
        <div className={styles.NoGroupsContainer}>
          <h3 className={styles.NoGroupsText}>No groups found.</h3>
          <Link href={urls.pages.app.newGroup}>
            <h3 className={styles.NoGroupsButton}>Create a new one?</h3>
          </Link>
        </div>
      )}
    </div>
  );
};

SearchGroups.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  searchCategory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  likeableGroups: PropTypes.arrayOf(PropTypes.object),
};

SearchGroups.defaultProps = {
  searchCategory: null,
  likeableGroups: [],
};

export default SearchGroups;
