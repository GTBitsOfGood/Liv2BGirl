import React from "react";
import PropTypes from "prop-types";
// import {} from "reactstrap";

const GroupPage = props => {
  const { groupid } = props;

  return (
    <div>
      <div className="header" />
      Test
    </div>
  );
};

GroupPage.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default GroupPage;
