import React from "react";
import PropTypes from "prop-types";
import {
  faGlobe,
  faGlasses,
  faCheck,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopNavBar from "../../../TopNavBar";
import styles from "../newquestion.module.scss";

const Audience = ({ toggle, visibility, setVisibility }) => (
  <>
    <TopNavBar backAction={toggle} title="Audience" />
    <div className={styles.AudiencePage}>
      <div
        role="button"
        tabIndex={0}
        className={styles.VisibilityCard}
        onClick={() => setVisibility("Public")}
        onKeyDown={() => setVisibility("Public")}
      >
        <div className={styles.VisibilityCardHead}>
          <FontAwesomeIcon icon={faGlobe} className={styles.Icon} />
          <h3 className={styles.Type}>Public</h3>
          {visibility === "Public" ? (
            <FontAwesomeIcon icon={faCheck} className={styles.Icon} />
          ) : (
            <div />
          )}
        </div>
        <h6 className={styles.VisDesc}>
          Others will see this question with your identify shown.
        </h6>
      </div>

      <div
        role="button"
        tabIndex={-1}
        className={styles.VisibilityCard}
        onClick={() => setVisibility("Anonymous")}
        onKeyDown={() => setVisibility("Anonymous")}
      >
        <div className={styles.VisibilityCardHead}>
          <FontAwesomeIcon icon={faGlasses} className={styles.Icon} />
          <h3 className={styles.Type}>Anonymous</h3>
          {visibility === "Anonymous" ? (
            <FontAwesomeIcon icon={faCheck} className={styles.Icon} />
          ) : (
            <div />
          )}
        </div>
        <h6 className={styles.VisDesc}>
          Others will see this question with your identity hidden.
        </h6>
      </div>

      <div
        role="button"
        tabIndex={-2}
        className={styles.VisibilityCard}
        onClick={() => setVisibility("Ambassador")}
        onKeyDown={() => setVisibility("Ambassador")}
      >
        <div className={styles.VisibilityCardHead}>
          <FontAwesomeIcon icon={faUserCircle} className={styles.Icon} />
          <h3 className={styles.Type}>Ambassador </h3>
          {visibility === "Ambassador" ? (
            <FontAwesomeIcon icon={faCheck} className={styles.Icon} />
          ) : (
            <div />
          )}
        </div>
        <h6 className={styles.VisDesc}>
          Only Ambassadors will see this question and your identity.
        </h6>
      </div>
    </div>
  </>
);

Audience.propTypes = {
  toggle: PropTypes.func.isRequired,
  visibility: PropTypes.string.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

export default Audience;
