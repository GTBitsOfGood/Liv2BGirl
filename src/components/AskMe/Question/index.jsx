import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Icon } from "@iconify/react";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";
import TextareaAutosize from "react-textarea-autosize";
import ThreadComment from "../../ThreadComment";
import TopNavBar from "../../TopNavBar";
import ActionModal from "../../ActionModal";
import { createComment } from "../../../actions/Comment";
import { addAskBookmark, removeAskBookmark } from "../../../actions/User";
import { avatarImg, colorArr } from "../../../../utils/avatars";
import urls from "../../../../utils/urls";
import styles from "../askme.module.scss";
import { deleteThread } from "../../../actions/AskMeThread";

const usernameRegex = /(?<=@)[^\s]*/g;

const Question = ({ currentUser, thread, comments }) => {
  const [comment, setComment] = React.useState("");
  const [saved, setSaved] = React.useState(
    currentUser.askBookmarks.includes(thread._id)
  );

  const handlePostComment = async () => {
    if (comment.length > 0) {
      const taggedUsers = new Set();

      const allUsernames = comment.match(usernameRegex);
      if (allUsernames != null && allUsernames.length > 0) {
        comments.forEach(({ author }) => {
          const { username } = author;

          if (!taggedUsers.has(username) && allUsernames.includes(username)) {
            taggedUsers.add(author._id);
          }
        });
      }

      const userArray = Array.from(taggedUsers);

      await createComment(null, thread._id, comment, userArray);
      window.location.reload();
    }
  };

  const toggleBookmarked = async () => {
    if (saved) {
      await removeAskBookmark(null, thread._id);
      setSaved(false);
    } else {
      await addAskBookmark(null, thread._id);
      setSaved(true);
    }
  };

  const actionButtons = [];

  if (
    thread.author._id === currentUser._id ||
    ["Admin", "Ambassador"].includes(currentUser.role)
  ) {
    actionButtons.push({
      title: "Delete Thread",
      action: () =>
        deleteThread(null, thread._id).then(() =>
          Router.replace(urls.pages.app.askMe.index)
        ),
    });
  }

  const officialAnswers = comments.filter((item) => item.officialAnswer);
  const generalComments = comments.filter((item) => !item.officialAnswer);

  return (
    <div className={styles.QuestionPage}>
      <TopNavBar
        backUrl={urls.pages.app.askMe.index}
        title="Question"
        rightNode={
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
        }
      />
      <div className={`Page ${styles.QuestionMain}`}>
        <h3>{`Question: ${thread.title}`}</h3>
        <div
          role="button"
          tabIndex={0}
          className={styles.QuestionDetails}
          onClick={
            thread.author._id != null
              ? () =>
                  Router.push(urls.pages.app.profile.view(thread.author._id))
              : () => {}
          }
          onKeyDown={
            thread.author._id != null
              ? () =>
                  Router.push(urls.pages.app.profile.view(thread.author._id))
              : () => {}
          }
        >
          <div
            className={styles.QuestionAuthorAvatar}
            style={{
              backgroundColor: colorArr[thread.author.avatarColor],
            }}
          >
            <img
              className={styles.AuthorAvatarImg}
              src={avatarImg[thread.author.avatar]}
              alt="Author Avatar"
            />
          </div>
          <h5 className={styles.QuestionAuthor}>{thread.author.username}</h5>
          <h6 className={styles.QuestionDate}>
            {new Date(thread.postedAt).toLocaleString()}
          </h6>
        </div>
        <h4 className={styles.QuestionText}>{thread.content}</h4>
        <ActionModal buttons={actionButtons} />
      </div>

      {officialAnswers.length > 0 && (
        <div className={styles.QuestionContent}>
          <h6 className={styles.SubHeader}>{"Ambassador's Answer"}</h6>
          <div>
            {officialAnswers.map((item) => (
              <ThreadComment
                key={item._id}
                comment={item}
                setReply={setComment}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      )}
      <div className={styles.QuestionContent}>
        <h6 className={styles.SubHeader}>
          {`Comments (${generalComments.length})`}
        </h6>
        <div>
          {generalComments.map((item) => (
            <ThreadComment
              key={item._id}
              comment={item}
              setReply={setComment}
              currentUser={currentUser}
            />
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
            onChange={(event) => setComment(event.target.value)}
            value={comment}
            maxRows={8}
          />
        </div>
        <button
          type="button"
          className="PostButton"
          onClick={handlePostComment}
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
    role: PropTypes.string.isRequired,
  }).isRequired,
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    visibility: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }),
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      parent: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      officialAnswer: PropTypes.bool.isRequired,
      postedAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.number.isRequired,
        avatarColor: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
};

export default Question;
