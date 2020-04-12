import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDebounce } from "../../../utils/hooks";

// Component
import Group from "../GroupCard";

// Styling
import styles from "../GroupsPage.module.scss";

// Navigation
import urls from "../../../../utils/urls";

const SearchGroups = ({ searchTerm, likeableGroups }) => {
  const [groups, setGroups] = useState(likeableGroups);
  const debouncedTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedTerm.length === 0) {
      setGroups(likeableGroups);
    }

    // Search for groups
  }, [debouncedTerm]);

  return (
    <>
      {searchTerm.length === 0 && (
        <h3 className={styles.LikeText}>Groups you may like:</h3>
      )}
      <div className={styles.SearchGroupsPage}>
        {groups.map(group => (
          <Group key={group.id} info={group} />
        ))}
        {groups.length === 0 && (
          <div className={styles.NoGroupsContainer}>
            <h3 className={styles.NoGroupsText}>
              {`There is no group about ${debouncedTerm.toLowerCase()} for now.`}
            </h3>
            <Link href={urls.pages.app.newgroup}>
              <h3 className={styles.NoGroupsButton}>Create a new one?</h3>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchGroups;
