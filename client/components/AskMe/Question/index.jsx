import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";

// Stylings
import styles from "../askme.module.scss";

const fakeComments = [
  {
    author: "CrazyPurpleFox",
    date: "00-00-0000 00:00",
    text:
      "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    author: "SadBlueElephant",
    date: "00-00-0000 00:00",
    text:
      "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    author: "HappyGreenBear",
    date: "00-00-0000 00:00",
    text:
      "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const QuestionPage = props => {
  const { questionid, question } = props;
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
        <Link href="/app/ask-me">
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </Link>
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
          <h5 className={styles.QuestionAuthor}>{author}</h5>
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
          {fakeComments.map(item => (
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
          ))}
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
