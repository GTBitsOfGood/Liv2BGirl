import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import dotsHorizontal from "@iconify/icons-mdi/dots-horizontal";
import Portal from "../Portal";
import classes from "./ActionModal.module.scss";

const ActionModal = ({ buttons }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const toggleOpen = () => setOpen((prevOpen) => !prevOpen);

  return (
    <>
      <Icon
        onClick={toggleOpen}
        className={classes.ToggleButton}
        icon={dotsHorizontal}
        width="18px"
      />
      {open && (
        <Portal>
          <div className={classes.AdminTab}>
            {buttons.map(({ title, action }) => (
              <button
                key={title}
                type="button"
                className={classes.AdminButton}
                onClick={() => {
                  action();
                  setOpen(false);
                }}
              >
                <h2>{title}</h2>
              </button>
            ))}

            <button
              type="button"
              className={classes.CancelButton}
              onClick={toggleOpen}
            >
              <h2>Cancel</h2>
            </button>
          </div>
        </Portal>
      )}
    </>
  );
};

ActionModal.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
};

ActionModal.defaultProps = {
  buttons: [],
  reloadButton: PropTypes.bool,
};

export default ActionModal;
