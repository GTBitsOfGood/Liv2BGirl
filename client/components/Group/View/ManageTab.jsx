import React from "react";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

// Styling
import styles from "./viewgroup.module.scss";

const ManageTab = ({ onClick, groupid }) => {
  return (
    <>
      <div className="TopNav" style={{ zIndex: "99999999" }}>
        <Icon
          onClick={onClick}
          className="Back"
          icon={bxArrowBack}
          width="18px"
        />
        <h3>Manage Members</h3>
        <div />
      </div>
      <div className={styles.ManageTab} />
    </>
  );
};

export default ManageTab;
