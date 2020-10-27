import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import urls from "../../../../../utils/urls";
import { unreportComment, deleteComment } from "../../../../actions/Comment";
import styles from "../ReportsPage.module.scss";
//import { unreportThread } from "../../../../actions/AskMeThread.js";

const Post = ({ Comment }) => {
   
  const unreport = async () => {
    await approvePost(Comment._id).then(() => {
      window.location.reload();
    })
  };

  const del = async () => {
    await deletePost(Comment._id).then(() => {
      window.location.reload();
    })
  };

  return (
    <a className={styles.AskMeReport}>
      <div className={styles.ReportHeader}>
        <h3 className={styles.Question}>{`Comment: ${Comment.content}`}</h3>
        <button variant="success" onClick={unreport}>Approve</button>
        <button variant="danger" onClick={del}>Reject</button>{" "}
      </div>
    </a>
   );  
 };

//return bookmarks.map((question) => (
// <QuestionCard key={question._id} question={question} />
// ));

Post.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  }).isRequired,
};

export default Post;