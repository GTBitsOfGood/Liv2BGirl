import React from "react";
import PropTypes from "prop-types";
// import {} from "reactstrap";
import "./GroupPage.scss";

const GroupPage = props => {
  const { groupid } = props;

  return (
    <div>
      <div className="group-header">
        <img
          style={{ width: "80px", borderRadius: "10px" }}
          src="https://picsum.photos/200/200"
          alt="Group Avatar"
        />
      </div>
      Test
    </div>
  );
};

GroupPage.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default GroupPage;
