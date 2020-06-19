import React from "react";
import PropTypes from "prop-types";
import Portal from "../Portal";
import classes from "./MentionModal.module.scss";

const MentionModal = React.forwardRef(({ users, index }, ref) => (
  <Portal>
    <div ref={ref} className={classes.root}>
      {users.map((user, i) => (
        <div
          key={user._id}
          className={classes.user}
          style={{
            background: i === index ? "#B4D5FF" : "transparent",
          }}
        >
          {user.username}
        </div>
      ))}
    </div>
  </Portal>
));

MentionModal.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
};

MentionModal.displayName = "MentionModal";

export default MentionModal;
