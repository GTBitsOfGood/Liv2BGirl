import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import { unreportComment, deleteComment } from "../../../../actions/Comment";
import DetailedTextField from "../../../DetailedTextField";
import styles from "../ReportsPage.module.scss";

const CommentReport = ({ Comment }) => {

  console.log(JSON.parse(Comment.content));
   
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
      <DetailedTextField
        readOnly={true}
        textNodes={
          Comment.content != null && Comment.content.length > 0
            ? JSON.parse(Comment.content)
            : null
        }
      />
        <button variant="success" onClick={unreport}>Approve</button>
        <button variant="danger" onClick={del}>Delete</button>{" "}
      </div>
    </a>
   );  
 };

CommentReport.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })
}

export default CommentReport;
