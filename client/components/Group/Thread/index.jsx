import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";
import TextareaAutosize from "react-textarea-autosize";
import ThreadComment from "../../ThreadComment";
import { createComment } from "../../../actions/Comment";
import { addGroupBookmark, removeGroupBookmark } from "../../../actions/User";
import { avatarImg, colorArr } from "../../../../utils/avatars";
import urls from "../../../../utils/urls";
import styles from "./thread.module.scss";

const Thread = ({ currentUser, thread, author, group, comments }) => {
  const [comment, setComment] = React.useState("");
  const [saved, setSaved] = React.useState(
    currentUser.groupBookmarks.includes(thread._id)
  );

  const postComment = async () => {
    if (comment.length > 0) {
      await createComment(null, thread._id, comment);
      window.location.reload();
    }
  };

  const toggleBookmarked = async () => {
    if (saved) {
      await removeGroupBookmark(cookies, thread._id);
      setSaved(false);
    } else {
      await addGroupBookmark(cookies, thread._id);
      setSaved(true);
    }
  };

  return (
    <div className={styles.ThreadPage}>
      <div className="TopNav">
        <Link href={urls.pages.app.group(group._id)}>
          <div>
            <Icon className="Back" icon={bxArrowBack} width="18px" />
          </div>
        </Link>
        <h3 className={styles.ThreadNavTitle}>Thread</h3>
        <button className="IconButton" type="button" onClick={toggleBookmarked}>
          {saved ? (
            <Icon icon={bxsBookmark} height="18px" />
          ) : (
            <Icon icon={bxBookmark} height="18px" />
          )}
        </button>
      </div>
      <div className={`Page ${styles.ThreadMain}`}>
        <div className={styles.ThreadInfo}>
          <img
            className={styles.ThreadGroupAvatar}
            src="https://picsum.photos/100/100"
            alt="Group Avatar"
          />
          <h6 className={styles.ThreadGroupName}>{group.name}</h6>
        </div>
        <h2 className={styles.ThreadName}>{thread.title}</h2>
        <div className={styles.ThreadDetails}>
          <div
            className={styles.ThreadAuthorAvatar}
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
          <div>
            <Link href={urls.pages.app.profile(author._id)}>
              <div>
                <h5 className={styles.ThreadAuthor}>{author.username}</h5>
              </div>
            </Link>

            <h6 className={styles.ThreadDate}>
              {new Date(thread.postedAt).toLocaleString()}
            </h6>
          </div>
        </div>
        <h4 className={styles.ThreadText}>{thread.content}</h4>
      </div>
      <div className={styles.ThreadComments}>
        {comments.map(item => (
          <ThreadComment
            key={item.comment._id}
            {...item}
            setReply={setComment}
          />
        ))}
      </div>

      <div className={styles.CommentFooter}>
        <div className={styles.Footer1}>
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

Thread.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    groupBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }).isRequired,
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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

export default Thread;
