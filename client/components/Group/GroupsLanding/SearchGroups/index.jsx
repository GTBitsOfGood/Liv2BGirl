import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDebounce } from "../../../../utils/hooks";

// Component
import Group from "../GroupCard";

// Styling
import styles from "../GroupsPage.module.scss";

// Navigation
import urls from "../../../../../utils/urls";

const SearchGroups = ({ searchTerm, likeableGroups, clearedSearch }) => {
  const [groups, setGroups] = useState(likeableGroups);
  const debouncedTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedTerm.length === 0) {
      clearedSearch();
    }

    // Search for groups
  }, [debouncedTerm]);

  return (
    <>
      <div className={styles.SearchGroupsPage}>
        {groups.map(group => (
          <Group key={group.id} info={group} />
        ))}
        {groups.length === 0 && (
          <div className={styles.NoGroupsContainer}>
            <h3 className={styles.NoGroupsText}>
              {`There are no groups about ${debouncedTerm.toLowerCase()} for now.`}
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
