import React from "react";

// Page Component
import NewThread from "../../../../client/components/Group/Thread/New";

const NewThreadPage = props => {
  const { currentUser } = props;
  return <NewThread currentUser={currentUser} />;
};

export default NewThreadPage;
