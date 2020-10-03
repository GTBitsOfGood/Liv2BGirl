import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Icon } from "@iconify/react";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";
import ThreadComment from "../../ThreadComment";
import TopNavBar from "../../TopNavBar";
import ActionModal from "../../ActionModal";
import DetailedTextField from "../../DetailedTextField";
import { createComment } from "../../../actions/Comment";
import { addAskBookmark, removeAskBookmark } from "../../../actions/User";
import { avatarImg, colorArr } from "../../../../utils/avatars";
import urls from "../../../../utils/urls";
import styles from "../askme.module.scss";
import { deleteThread } from "../../../actions/AskMeThread";
import QuestionTitle from "./QuestionTitle";

const Question = ({ currentUser, thread, comments }) => {
  const [comment, setComment] = React.useState("");
  const [isChanging, setChanging] = React.useState(false);
  const [taggedUsers, setTaggedUsers] = React.useState([]);
  const [saved, setSaved] = React.useState(
    currentUser.askBookmarks.includes(thread._id)
  );

  const handlePostComment = async () => {
    if (comment.length > 0) {
      await createComment(null, thread._id, comment, taggedUsers)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error.message);
        });
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
    actionButtons.push({
      title: "Edit Thread",
      action: () => setChanging(true),
    });
  }

  const officialAnswers = comments.filter((item) => item.officialAnswer);
  const generalComments = comments.filter((item) => !item.officialAnswer);

  const taggableUserMap = new Map();
  taggableUserMap.set(thread.author._id, {
    _id: thread.author._id,
    username: thread.author.username,
  });
  comments.forEach(({ author }) => {
    if (!taggableUserMap.has(author._id)) {
      taggableUserMap.set(author._id, {
        _id: author._id,
        username: author.username,
      });
    }
  });
  const taggableUsers = Array.from(taggableUserMap.values());

  return (
    <div className={styles.root}>
      <TopNavBar
        className={styles.NavBar}
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

      <div className={styles.post}>
        {actionButtons.length > 0 && <ActionModal buttons={actionButtons} />}
        <QuestionTitle
          isChanging={isChanging}
          thread_id={thread._id}
          thread_name={thread.title}
        ></QuestionTitle>
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
        <DetailedTextField
          readOnly={true}
          textNodes={
            thread.content != null && thread.content.length > 0
              ? JSON.parse(thread.content)
              : null
          }
        />
      </div>

      {officialAnswers.length > 0 && (
        <div className={styles.QuestionAnswers}>
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
      <div className={styles.QuestionComments}>
        <h6 className={styles.SubHeader}>
          {`Comments (${generalComments.length})`}
        </h6>
        <div className={styles.AllComments}>
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
          <div className={styles.NewCommentContainer}>
            <DetailedTextField
              readOnly={false}
              users={taggableUsers}
              onChange={({ nodes, mentions }) => {
                setComment(nodes);
                setTaggedUsers(mentions);
              }}
            />
          </div>
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
