import React, { useEffect } from "react";

// Styling
import styles from "./newgroup.module.scss";

const TermsCond = ({ values, setValues, setStageCompleted }) => {
  const { checked } = values;

  useEffect(() => {
    if (checked === true) {
      setStageCompleted(true);
    }
  }, [checked]);

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
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h3>
        <div className={styles.CheckTerms}>
          <label className={styles.CheckboxLabel} htmlFor="checkTerms">
            <h3>I agree to the Terms & Agreement</h3>
          </label>
          <input
            id="checkTerms"
            className={styles.CustomCheckbox}
            type="checkbox"
            onClick={() => setValues({ checked: !checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsCond;
