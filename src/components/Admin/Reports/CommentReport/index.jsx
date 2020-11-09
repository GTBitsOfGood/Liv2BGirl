import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import { unreportComment, deleteComment } from "../../../../actions/Comment";
import styles from "../ReportsPage.module.scss";

const CommentReport = ({ Comment }) => {
   
  const unreport = async () => {
    await unreportComment(null, Comment._id).then(() => {
      window.location.reload();
    })
  };

  const del = async () => {
    await deleteComment(null, Comment._id).then(() => {
      window.location.reload();
    })
  };

  return (
    <a className={styles.AskMeReport}>
      <div className={styles.ReportHeader}>
        <h3 className={styles.Question}>{`Comment: ${Comment.content}`}</h3>
        <button variant="success" onClick={unreport}>Approve</button>
        <button variant="danger" onClick={del}>Delete</button>{" "}
      </div>
    </a>
   );  
 };
 
CommentReport.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  }).isRequired,
};

export default CommentReport;
