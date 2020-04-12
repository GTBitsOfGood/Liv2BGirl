import React, { useEffect } from "react";

// Styling
import styles from "./viewgroup.module.scss";

const AdminTab = ({ onClick }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.AdminTab}>
      <button type="button" className={styles.AdminButton}>
        <h2>Manage Members</h2>
      </button>
      <button type="button" className={styles.AdminButton}>
        <h2>Delete Group</h2>
      </button>
      <button type="button" className={styles.CancelButton} onClick={onClick}>
        <h2>Cancel</h2>
      </button>
    </div>
  );
};

export default AdminTab;
