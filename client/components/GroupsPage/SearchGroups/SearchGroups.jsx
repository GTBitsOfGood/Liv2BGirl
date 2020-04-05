import React from "react";
import Group from "./Group";
import { useDebounce } from "../../../utils/hooks";
import classes from "./SearchGroups.module.scss";

const SearchGroups = ({ searchTerm, likeableGroups }) => {
  const [groups, setGroups] = React.useState(likeableGroups);

  React.useEffect(() => {
    if (searchTerm.length === 0) {
      setGroups(likeableGroups);
    }
  }, [searchTerm]);

  const debouncedTerm = useDebounce(searchTerm, 500);
  React.useEffect(() => {
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
      </div>
    </>
  );
};

export default SearchGroups;
