import React from "react";
import PropTypes from "prop-types";
import TopNavBar from "../../TopNavBar";
import styles from "./viewgroup.module.scss";

const ManageTab = ({ onClick }) => {
  return (
    <>
      <TopNavBar backAction={onClick} title="Manage Members" />
      <div className={styles.ManageTab} />
    </>
  );
};

ManageTab.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ManageTab;
