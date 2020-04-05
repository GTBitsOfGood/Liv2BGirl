import React from "react";
import Link from "next/link";
import Group from "./Group";
import { useDebounce } from "../../../utils/hooks";
import classes from "./SearchGroups.module.scss";
import urls from "../../../../utils/urls";

const SearchGroups = ({ searchTerm, likeableGroups }) => {
  const [groups, setGroups] = React.useState(likeableGroups);

  const debouncedTerm = useDebounce(searchTerm, 500);
  React.useEffect(() => {
    if (debouncedTerm.length === 0) {
      setGroups(likeableGroups);
    }

    // Search for groups
  }, [debouncedTerm]);

  return (
    <>
      {searchTerm.length === 0 && (
        <p className={classes.likeText}>Groups you may like:</p>
      )}
      <div className={classes.root}>
        {groups.map(group => (
          <Group key={group.id} info={group} />
        ))}
        {groups.length === 0 && (
          <div className={classes.noGroupsContainer}>
            <p className={classes.noGroupsText}>
              {`There is no group about ${debouncedTerm.toLowerCase()} for now.`}
            </p>
            <Link href={urls.pages.app.newGroup}>
              <p className={classes.noGroupsButton}>Create a new one?</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchGroups;
