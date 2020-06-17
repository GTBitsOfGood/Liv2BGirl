import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";
import urls from "../../../../utils/urls";
import styles from "../askme.module.scss";

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }

  return `${Math.floor(seconds)} seconds`;
};

const QuestionCard = ({ question }) => (
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

QuestionCard.propTypes = {
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

export default QuestionCard;
