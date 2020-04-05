import React from "react";
import Link from "next/link";
import classes from "./MyGroups.module.scss";
import AllGroups from "./AllGroups";
import urls from "../../../../utils/urls";

const MyGroups = ({ groups }) => {
  const [showAll, setShowAll] = React.useState(false);

  if (showAll) {
    return <AllGroups groups={groups} handleBack={() => setShowAll(false)} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.myGroupsContainer}>
        <div className={classes.myGroupsHeader}>
          <h1 className={classes.myGroupsHeaderText}>My Groups</h1>
          <button
            className={classes.myGroupsButton}
            onClick={() => setShowAll(true)}
            type="button"
          >
            All
          </button>
        </div>

        <div className={classes.myGroupsGroups}>
          {groups.slice(0, 4).map(group => (
            <Link
              key={group.id}
              href={urls.pages.app.group(group.id)}
              prefetch={false}
            >
              <div className={classes.myGroupType}>
                <div className={classes.myGroupImage} />
                <p className={classes.myGroupTitle}>{group.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
