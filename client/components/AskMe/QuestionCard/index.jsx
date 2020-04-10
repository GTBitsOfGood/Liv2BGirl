import React from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";

// Styling
import styles from "../askme.module.scss";

const QuestionCard = ({ question }) => {
  const {
    id,
    asked,
    comments,
    postDate,
    answeredDate,
    ambassador,
    answer,
  } = question;

  return (
    <>
      <Link href={`/app/ask-me/view/${id}`}>
        <div className={styles.QuestionCard}>
          <div className={styles.QuestionHeader}>
            <h3 className={styles.Question}>{`Question: ${asked}`}</h3>
            <Icon className={styles.CommentIcon} icon={bxCommentDetail} />
            <h6 className={styles.Comments}>{comments}</h6>
          </div>
          {answeredDate ? (
            <div className={styles.Answered}>
              <div className={styles.AmbassadorInfo}>
                {ambassador.avatar ? (
                  <div />
                ) : (
                  <div className={styles.AvatarPic} />
                )}
                <div>
                  <h4>{ambassador.name}</h4>
                  <p className={styles.AnsweredDate}>
                    {`Answered ${answeredDate}h ago`}
                  </p>
                </div>
              </div>
              <h4 className={styles.Answer}>{`Answer: ${answer}`}</h4>
            </div>
          ) : (
            <div className={styles.Unanswered}>
              <p className={styles.AskedDate}>
                {postDate > 1
                  ? `Asked ${postDate} days ago`
                  : `Asked ${postDate} day ago`}
              </p>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default QuestionCard;
