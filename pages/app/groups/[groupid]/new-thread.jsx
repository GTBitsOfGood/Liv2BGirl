import React from "react";
import PropTypes from "prop-types";

// Page Component
import NewThread from "../../../../client/components/Group/Thread/New";

const NewThreadPage = props => {
  const { currentUser } = props;
  return <NewThread currentUser={currentUser} />;
};

NewThreadPage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewThreadPage;
