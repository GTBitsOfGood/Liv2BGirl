import React, { useEffect, useState } from "react";
import Router from "next/router";

// API Call
import { deleteGroup } from "../../../actions/Group";

// Components
import ManageTab from "./ManageTab";

// Styling
import styles from "./viewgroup.module.scss";

const AdminTab = ({ onClick, groupid }) => {
  const [confirmDelete, setDelete] = useState(false);
  const [manageMems, setManage] = useState(false);

  const toggleManage = () => {
    setManage(!manageMems);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {!manageMems ? (
        <div className={styles.AdminTab}>
          {!confirmDelete ? (
            <>
              <button
                type="button"
                className={styles.AdminButton}
                onClick={() => toggleManage()}
              >
                <h2>Manage Members</h2>
              </button>
              <button
                type="button"
                className={styles.AdminButton}
                onClick={() => setDelete(true)}
              >
                <h2>Delete Group</h2>
              </button>
              <button
                type="button"
                className={styles.CancelButton}
                onClick={onClick}
              >
                <h2>Cancel</h2>
              </button>
            </>
          ) : (
            <div className={styles.DeleteModal}>
              <h3 className={styles.Header}>Delete Group</h3>
              <h6 className={styles.Message}>
                Are you sure you want to delete this group?
              </h6>
              <div className={styles.Buttons}>
                <button
                  type="button"
                  className={styles.Cancel}
                  onClick={() => setDelete(false)}
                >
                  <h3>Cancel</h3>
                </button>
                <button
                  type="button"
                  className={styles.Confirm}
                  onClick={() => {
                    deleteGroup(groupid).then(res => {
                      if (res) {
                        Router.push("/groups");
                      }
                    });
                  }}
                >
                  <h3>Delete</h3>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ManageTab onClick={() => toggleManage()} />
      )}
    </>
  );
};

export default AdminTab;
