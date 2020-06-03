import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "./Comment/Comment";
import { createComment } from "../../../actions/Comment";
import { addAskBookmark, removeAskBookmark } from "../../../actions/User";
import { avatarImg, colorArr } from "../../../../utils/avatars";
import urls from "../../../../utils/urls";
import styles from "../askme.module.scss";

const Question = ({ currentUser, threadId, thread, author, comments }) => {
  const [comment, setComment] = React.useState("");
  const [saved, setSaved] = React.useState(
    currentUser.askBookmarks.includes(threadId)
  );

  const postComment = async () => {
    if (comment.length > 0) {
      await createComment(currentUser._id, threadId, comment).then(() =>
        window.location.reload()
      );
    }
  };

  const toggleBookmarked = () => {
    if (saved) {
      return removeAskBookmark(threadId, currentUser._id).then(() =>
        setSaved(false)
      );
    }

    return addAskBookmark(threadId, currentUser._id).then(() => setSaved(true));
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
          className="IconButton"
          type="button"
          onClick={toggleBookmarked}
          onKeyPress={toggleBookmarked}
        >
          {saved ? (
            <Icon icon={bxsBookmark} height="18px" />
          ) : (
            <Icon icon={bxBookmark} height="18px" />
          )}
        </button>
      </div>

      <div className={`Page ${styles.QuestionMain}`}>
        <h3>{`Question: ${thread.title}`}</h3>
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
            {new Date(thread.postedAt).toLocaleString()}
          </h6>
        </div>
        <h4 className={styles.QuestionText}>{thread.content}</h4>
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
            <Comment author={item.author} comment={item.comment} />
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
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    posterId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    visibility: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.number.isRequired,
        avatarColor: PropTypes.number.isRequired,
      }).isRequired,
      comment: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        parentId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        officialAnswer: PropTypes.bool.isRequired,
        postedAt: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Question;
