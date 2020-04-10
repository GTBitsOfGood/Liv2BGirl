import React from "react";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

import {
  faGlobe,
  faGlasses,
  faCheck,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "../newquestion.module.scss";

const Audience = props => {
  const { toggle, visibility, setVisibility } = props;

  return (
    <>
      <div className="TopNav">
        <Icon
          className="Back"
          icon={bxArrowBack}
          width="18px"
          onClick={toggle}
        />
        <h3>Audience</h3>
        <div />
      </div>
      <div className={classes.AudiencePage}>
        <div
          role="button"
          tabIndex={0}
          className={classes.VisibilityCard}
          onClick={() => setVisibility("Public")}
          onKeyDown={() => setVisibility("Public")}
        >
          <div className={classes.VisibilityCardHead}>
            <FontAwesomeIcon icon={faGlobe} className={classes.Icon} />
            <h3 className={classes.Type}>Public</h3>
            {visibility === "Public" ? (
              <FontAwesomeIcon icon={faCheck} className={classes.Icon} />
            ) : (
              <div />
            )}
          </div>
          <h6 className={classes.VisDesc}>
            Others will see this question with your identify shown.
          </h6>
        </div>

        <div
          role="button"
          tabIndex={-1}
          className={classes.VisibilityCard}
          onClick={() => setVisibility("Anonymous")}
          onKeyDown={() => setVisibility("Anonymous")}
        >
          <div className={classes.VisibilityCardHead}>
            <FontAwesomeIcon icon={faGlasses} className={classes.Icon} />
            <h3 className={classes.Type}>Anonymous</h3>
            {visibility === "Anonymous" ? (
              <FontAwesomeIcon icon={faCheck} className={classes.Icon} />
            ) : (
              <div />
            )}
          </div>
          <h6 className={classes.VisDesc}>
            Others will see this question with your identity hidden.
          </h6>
        </div>

        <div
          role="button"
          tabIndex={-2}
          className={classes.VisibilityCard}
          onClick={() => setVisibility("Ambassador")}
          onKeyDown={() => setVisibility("Ambassador")}
        >
          <div className={classes.VisibilityCardHead}>
            <FontAwesomeIcon icon={faUserCircle} className={classes.Icon} />
            <h3 className={classes.Type}>Ambassador </h3>
            {visibility === "Ambassador" ? (
              <FontAwesomeIcon icon={faCheck} className={classes.Icon} />
            ) : (
              <div />
            )}
          </div>
          <h6 className={classes.VisDesc}>
            Only Ambassadors will see this question and your identity.
          </h6>
        </div>
      </div>
    </>
  );
};

export default Audience;
