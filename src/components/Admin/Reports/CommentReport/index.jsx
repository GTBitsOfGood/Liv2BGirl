import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import styles from "../ReportsPage.module.scss";
//import { unreportThread } from "../../../../actions/AskMeThread.js";

const CommentReport = ({ Comment }) => (
    <a className={styles.AskMeReport}>
      <div className={styles.ReportHeader}>
        <h3 className={styles.Question}>{`Comment: ${Comment.content}`}</h3>
        <button variant="success">Approve</button>
        <button variant="danger">Delete</button>{" "}
      </div>
    </a>
);

//return bookmarks.map((question) => (
// <QuestionCard key={question._id} question={question} />
// ));

CommentReport.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  }).isRequired,
};

export default CommentReport;
