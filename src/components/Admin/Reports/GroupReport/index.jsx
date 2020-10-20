import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";
import urls from "../../../../utils/urls";
import styles from "../askme.module.scss";

const GroupReport = ({ question }) => (
  <Link
    href={urls.pages.app.askMe.questions.view()}
    as={urls.pages.app.askMe.questions.view(question._id)}
  >
    <a className={styles.QuestionCard}>
      <div className={styles.QuestionHeader}>
        <h3 className={styles.Question}>{`Question: ${question.title}`}</h3>
        <Icon className={styles.CommentIcon} icon={bxCommentDetail} />
        <h6 className={styles.Comments}>{question.numComments}</h6>
      </div>
      <div className={styles.Unanswered}>
        <p className={styles.AskedDate}>
          {`Asked ${timeSince(question.postedAt)} ago`}
        </p>
      </div>
    </a>
  </Link>
);

GroupReport.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    numComments: PropTypes.number.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default GroupReport;