import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { Icon } from "@iconify/react";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import ThreadComment from "../../ThreadComment";
import TopNavBar from "../../TopNavBar";
import ActionModal from "../../ActionModal";
import DetailedTextField from "../../DetailedTextField";
import { deleteThread } from "../../../actions/GroupThread";
import { reportThread } from "../../../actions/GroupThread";

import { createComment } from "../../../actions/Comment";
import { addGroupBookmark, removeGroupBookmark } from "../../../actions/User";
import { avatarImg, colorArr } from "../../../../utils/avatars";
import urls from "../../../../utils/urls";
import styles from "./thread.module.scss";

const Thread = ({ currentUser, thread, group, comments }) => {
  const [comment, setComment] = React.useState("");
  const [taggedUsers, setTaggedUsers] = React.useState([]);
  const [saved, setSaved] = React.useState(
    currentUser.groupBookmarks.includes(thread._id)
  );

  const postComment = async () => {
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
      await removeGroupBookmark(null, thread._id);
      setSaved(false);
    } else {
      await addGroupBookmark(null, thread._id);
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
          Router.replace(urls.pages.app.groups.group.view(group._id))
        ),
    });
  }

  if (thread.author._id != currentUser._id) {
    actionButtons.push({
      title: "Report Thread",
      action: () =>
        reportThread(null, thread._id).then(() =>
          Router.replace(urls.pages.app.groups.group.view(group._id))
        ),
    });
  }

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
        backUrl={urls.pages.app.groups.group.view()}
        backUrlAs={urls.pages.app.groups.group.view(group._id)}
        title="Thread"
        rightNode={
          <button
            className="IconButton"
            type="button"
            onClick={toggleBookmarked}
          >
            {saved ? (
              <Icon icon={bxBookmark} height="18px" />
            ) : (
              <Icon icon={bxBookmark} height="18px" />
            )}
          </button>
        }
      />

      <div className={styles.post}>
        <div className={styles.ThreadInfo}>
          <img
            className={styles.ThreadGroupAvatar}
            src="https://picsum.photos/100/100"
            alt="Group Avatar"
          />
          <h6 className={styles.ThreadGroupName}>{group.name}</h6>
        </div>
        {actionButtons.length > 0 && <ActionModal buttons={actionButtons} />}
        <h2 className={styles.ThreadName}>{thread.title}</h2>
        <div className={styles.ThreadDetails}>
          <div
            className={styles.ThreadAuthorAvatar}
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
          <div>
            <Link
              href={urls.pages.app.profile.view()}
              as={urls.pages.app.profile.view(thread.author._id)}
            >
              <h5 className={styles.ThreadAuthor}>{thread.author.username}</h5>
            </Link>

            <h6 className={styles.ThreadDate}>
              {new Date(thread.postedAt).toLocaleString()}
            </h6>
          </div>
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

      <div className={styles.commentsContainer}>
        {comments.map((comment) => (
          <ThreadComment
            key={comment._id}
            comment={comment}
            setReply={setComment}
            currentUser={currentUser}
          />
        ))}
      </div>

      <div className={styles.CommentFooter}>
        <div className={styles.CommentTextContainer}>
          <div
            className={`${styles.ThreadAuthorAvatar} ${styles.UserAvatar}`}
            style={{
              backgroundColor: colorArr[currentUser.avatarColor],
            }}
          >
            <img
              className={styles.AuthorAvatarImg}
              src={avatarImg[currentUser.avatar]}
              alt="Author Avatar"
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
          onClick={postComment}
          style={{ marginLeft: "auto", marginTop: "12px" }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

Thread.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    groupBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.number.isRequired,
      avatarColor: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
      taggedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.number.isRequired,
        avatarColor: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,
};

export default Thread;
