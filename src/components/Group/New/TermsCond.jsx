import React from "react";
import PropTypes from "prop-types";
import styles from "./newgroup.module.scss";

const TermsCond = ({ handleNext }) => {
  const [checked, setChecked] = React.useState(false);

  const goToNext = () => {
    if (!checked) {
      window.alert("The terms must be accepted before creating a group!");
    } else {
      handleNext();
    }
  };

  return (
    <div className={styles.TermPage}>
      <div className="Page" style={{ marginBottom: "30px" }}>
        <h1 className={styles.TermHeader}>Terms & Agreement</h1>
        <h3 className={styles.TermContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h3>
        <h3 className={styles.TermContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h3>
        <div className={styles.CheckTerms}>
          <input
            id="checkTerms"
            className={styles.CustomCheckbox}
            type="checkbox"
            onChange={(event) => setChecked(event.target.checked)}
            checked={checked}
          />
          <label className={styles.CheckboxLabel} htmlFor="checkTerms">
            <h3>I agree to the Terms & Agreement</h3>
          </label>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button
          className="NextButton"
          type="button"
          onClick={goToNext}
          onKeyPress={goToNext}
        >
          <h1>NEXT STEP</h1>
        </button>
      </div>
    </div>
  );
};

TermsCond.propTypes = {
  handleNext: PropTypes.func.isRequired,
};

export default TermsCond;
