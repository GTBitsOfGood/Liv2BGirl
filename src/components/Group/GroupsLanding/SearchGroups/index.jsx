import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Group from "../GroupCard";
import Spinner from "./Spinner";
import { useDebounce } from "../../../../utils/hooks";
import { searchGroups } from "../../../../actions/Group";
import urls from "../../../../../utils/urls";
import styles from "../GroupsPage.module.scss";

const SearchGroups = ({ searchTerm, searchCategory, likeableGroups }) => {
  const [groups, setGroups] = React.useState(likeableGroups);
  const [isSearching, setIsSearching] = React.useState(false);
  const debouncedTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    setIsSearching(true);

    searchGroups(null, {
      term: debouncedTerm,
      category: searchCategory ? searchCategory._id : null,
    })
      .then((newGroups) => {
        setGroups(newGroups);
        setIsSearching(false);
      })
      .catch(() => {
        window.alert("Failed to search :(");
        setIsSearching(false);
      });
  }, [debouncedTerm, searchCategory]);

  return (
    <div className={styles.SearchGroupsPage}>
      {groups.map((group) => (
        <Group key={group._id} info={group} />
      ))}
      {isSearching && <Spinner />}
      {groups.length === 0 && !isSearching && (
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
