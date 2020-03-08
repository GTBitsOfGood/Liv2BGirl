import React from "react";
import PropTypes from "prop-types";
// import {} from "reactstrap";
import "./GroupPage.scss";

const GroupPage = props => {
  const { groupid } = props;

  return (
    <div>
      <div className="group-header">a</div>
      Test
    </div>
  );
};

GroupPage.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default GroupPage;
