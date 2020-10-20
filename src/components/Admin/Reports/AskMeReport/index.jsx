import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";
import urls from "../../../../../utils/urls";
import styles from "../ReportsPage.module.scss";



const AskMeReport = ({ Thread }) => (
  <Link
    href={urls.pages.app.askMe.questions.view()}
    as={urls.pages.app.askMe.questions.view(Thread._id)}
  >
    <a className={styles.AskMeReport}>
      <div className={styles.ReportHeader}>
        <h3 className={styles.Question}>{`Question: ${Thread.title}`}</h3>
        <Icon className={styles.CommentIcon} icon={bxCommentDetail} />
      </div>
    </a>
  </Link>
);

//return bookmarks.map((question) => (
   // <QuestionCard key={question._id} question={question} />
   // ));

AskMeReport.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AskMeReport;