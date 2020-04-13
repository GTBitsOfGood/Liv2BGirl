import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";

// Component
import TextareaAutosize from "react-textarea-autosize";
import urls from "../../../../utils/urls";

// API Calls
import { createComment } from "../../../actions/Comment";

// Stylings
import { avatarImg, colorArr } from "../../../../utils/avatars";
import styles from "../askme.module.scss";

const Question = ({ question, currentUser }) => {
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  const {
    questionid,
    author,
    asked,
    description,
    comments,
    postedAt,
    visibility,
  } = question;

  const postComment = () => {
    if (comment.length > 0) {
      createComment(currentUser.id, questionid, comment).then(res => {
        if (res) {
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className={styles.QuestionPage}>
      <div className="TopNav">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => Router.push(urls.pages.app.askMe)}
          onKeyDown={() => Router.push(urls.pages.app.askMe)}
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
        <div
          role="button"
          tabIndex={0}
          className={styles.QuestionDetails}
          onClick={
            author.userId != null
              ? () => Router.push(urls.pages.app.profile(author.userId))
              : () => {}
          }
          onKeyDown={
            author.userId != null
              ? () => Router.push(urls.pages.app.profile(author.userId))
              : () => {}
          }
        >
          <div
            className={styles.QuestionAuthorAvatar}
            style={{
              backgroundColor: colorArr[author.avatarColor],
            }}
          >
            <img
              className={styles.AuthorAvatarImg}
              src={avatarImg[author.avatar]}
              alt="Author Avatar"
            />
          </div>
          <h5 className={styles.QuestionAuthor}>{author.username}</h5>
          <h6 className={styles.QuestionDate}>
            {new Date(postedAt).toLocaleString()}
          </h6>
        </div>
        <h4 className={styles.QuestionText}>{description}</h4>
      </div>

      <div className={styles.QuestionContent}>
        {/* {ambassador && (
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
        )} */}

        <h6 className={styles.SubHeader}>{`Comments (${comments.length})`}</h6>
        <div>
          {comments.map(item => (
            <div className={`Page ${styles.QuestionComments}`}>
              <div
                className={styles.QuestionDetails}
                onClick={
                  item.author.id != null
                    ? () => Router.push(urls.pages.app.profile(item.author.id))
                    : () => {}
                }
                onKeyDown={
                  item.author.id != null
                    ? () => Router.push(urls.pages.app.profile(item.author.id))
                    : () => {}
                }
              >
                <div
                  className={styles.QuestionAuthorAvatar}
                  style={{
                    backgroundColor: colorArr[item.author.avatarColor],
                  }}
                >
                  <img
                    className={styles.AuthorAvatarImg}
                    src={avatarImg[item.author.avatar]}
                    alt="Author Avatar"
                  />
                </div>
                <h5 className={styles.QuestionAuthor}>
                  {item.author.username}
                </h5>
                <h6 className={styles.QuestionDate}>
                  {new Date(item.postedAt).toLocaleString()}
                </h6>
              </div>
              <h4 className={styles.QuestionText}>{item.content}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.CommentFooter}>
        <div className={styles.Footer1}>
          <div
            className={styles.CommentAuthorAvatar}
            style={{
              backgroundColor: colorArr[currentUser.avatarColor],
            }}
          >
            <img
              className={styles.AuthorAvatarImg}
              src={avatarImg[currentUser.avatar]}
              alt="User Avatar"
            />
          </div>
          <TextareaAutosize
            className={styles.CommentInput}
            placeholder="Comment"
            onChange={event => setComment(event.target.value)}
            value={comment}
            maxRows={8}
          />
        </div>
        <button
          type="button"
          className="PostButton"
          onClick={() => postComment()}
          style={{ marginLeft: "auto", marginTop: "12px" }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    questionid: PropTypes.string.isRequired,
    visiblity: PropTypes.string.isRequired,
    asked: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string.isRequired),
    author: PropTypes.shape({
      userId: PropTypes.string,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
};

export default Question;
