import React from "react";
import PropTypes from "prop-types";

const GroupCard = props => {
  const { title, description, image } = props;

  return (
    <div className="group-thread-card">
      <img className="group-avatar" src={image} alt="Group Pic" />
      <div className="thread-info">
        <h1 className="thread-card-title">{title}</h1>
        <h2 className="thread-card-summary">{description}</h2>
      </div>
    </div>
  );
};

GroupCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default GroupCard;
