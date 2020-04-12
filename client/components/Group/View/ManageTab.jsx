import React from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

// Logo for Header
import logo from "../../../../public/img/logo.png";

// Styling
import styles from "./viewgroup.module.scss";

// Navigation
import urls from "../../../../utils/urls";

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
