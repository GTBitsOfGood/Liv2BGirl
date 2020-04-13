import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";

// Stylings
import styles from "../askme.module.scss";

const QuestionPage = props => {
  const { question } = props;
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  const {
    id,
    author,
    asked,
    description,
    comments,
    postDate,
    answeredDate,
    ambassador,
    answer,
  } = question;

  return (
    <div className={styles.QuestionPage}>
      <div className="TopNav">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => Router.back()}
          onKeyDown={() => Router.back()}
        >
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </div>
        <h3 className={styles.QuestionNavTitle}>Question</h3>
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className="IconButton"
        >
          {saved ? (
            <Icon icon={bxsBookmark} height="18px" />
          ) : (
            <Icon icon={bxBookmark} height="18px" />
          )}
        </button>
      </div>

      <div className={`Page ${styles.QuestionMain}`}>
        <h3>{`Question: ${asked}`}</h3>
        <div className={styles.QuestionDetails}>
          <img
            className={styles.QuestionAuthorAvatar}
            src="https://picsum.photos/50/50"
            alt="Group Avatar"
          />
          {/* <h5 className={styles.QuestionAuthor}>{author}</h5> */}
          <h6 className={styles.QuestionDate}>{postDate}</h6>
        </div>
        <h4 className={styles.QuestionText}>{description}</h4>
      </div>

      <div className={styles.QuestionContent}>
        {ambassador && (
          <>
            <h6 className={styles.SubHeader}>Ambassador’s Answer</h6>
            <div className={`Page ${styles.QuestionComments}`}>
              <div className={styles.QuestionDetails}>
                <img
                  className={styles.QuestionAuthorAvatar}
                  src="https://picsum.photos/50/50"
                  alt="Group Avatar"
                />
                <h5 className={styles.QuestionAuthor}>{ambassador.name}</h5>
                <h6 className={styles.QuestionDate}>{answeredDate}</h6>
              </div>
              <h4 className={styles.QuestionText}>{answer}</h4>
            </div>
          </>
        )}

        <h6 className={styles.SubHeader}>{`Comments (${comments})`}</h6>
        <div>
          {/* {fakeComments.map(item => (
            <div className={`Page ${styles.QuestionComments}`}>
              <div className={styles.QuestionDetails}>
                <img
                  className={styles.QuestionAuthorAvatar}
                  src="https://picsum.photos/50/50"
                  alt="Group Avatar"
                />
                <h5 className={styles.QuestionAuthor}>{item.author}</h5>
                <h6 className={styles.QuestionDate}>{item.date}</h6>
              </div>
              <h4 className={styles.QuestionText}>{item.text}</h4>
            </div>
          ))} */}
        </div>
      </div>

      <div className={styles.CommentFooter}>
        <img
          className={styles.UserAvatar}
          src="https://picsum.photos/100/100"
          alt="User Avatar"
        />
        <textarea className={styles.CommentInput} />
      </div>
    </div>
  );
};

QuestionPage.propTypes = {
  questionid: PropTypes.string.isRequired,
};

export default QuestionPage;
