import React from "react";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";

// Styling
import classes from "../askme.module.scss";

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
        <div className={classes.QuestionCard}>
          <div className={classes.QuestionHeader}>
            <h3 className={classes.Question}>{`Question: ${asked}`}</h3>
            <Icon className={classes.CommentIcon} icon={bxCommentDetail} />
            <h6 className={classes.Comments}>{comments}</h6>
          </div>
          {answeredDate ? (
            <div className={classes.Answered}>
              <div className={classes.AmbassadorInfo}>
                {ambassador.avatar ? (
                  <div />
                ) : (
                  <div className={classes.AvatarPic} />
                )}
                <div>
                  <h4>{ambassador.name}</h4>
                  <p className={classes.AnsweredDate}>
                    {`Answered ${answeredDate}h ago`}
                  </p>
                </div>
              </div>
              <h4 className={classes.Answer}>{`Answer: ${answer}`}</h4>
            </div>
          ) : (
            <div className={classes.Unanswered}>
              <p className={classes.AskedDate}>
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
