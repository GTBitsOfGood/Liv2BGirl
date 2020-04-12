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
        <h1>Manage Members</h1>
      </button>
      <button type="button" className={styles.AdminButton}>
        <h1>Delete Group</h1>
      </button>
      <button type="button" className={styles.CancelButton} onClick={onClick}>
        <h1>Cancel</h1>
      </button>
    </div>
  );
};

export default AdminTab;
