import React from "react";
import ExploreGroups from "../../client/components/ExploreGroups";
import SearchGroups from "../../client/components/SearchGroups";
import MyGroups from "../../client/components/MyGroups";

const GroupsPage = () => {
  const [search, setSearch] = React.useState("");
  const [ownGroups, setOwnGroups] = React.useState(false);

  if (search.length > 0) {
    return <SearchGroups searchTerm={search} ownGroups={ownGroups} />;
  }

  if (ownGroups) {
    return <MyGroups />;
  }

  return <ExploreGroups />;
};

export default GroupsPage;
