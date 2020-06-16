import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Icon } from "@iconify/react";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";
import TextareaAutosize from "react-textarea-autosize";
import ThreadComment from "../../ThreadComment";
import TopNavBar from "../../TopNavBar";
import { createComment } from "../../../actions/Comment";
import { addGroupBookmark, removeGroupBookmark } from "../../../actions/User";
import { avatarImg, colorArr } from "../../../../utils/avatars";
import urls from "../../../../utils/urls";
import styles from "./thread.module.scss";

const usernameRegex = /(?<=@)[^\s]*/g;

const Thread = ({ currentUser, thread, group, comments }) => {
  const [comment, setComment] = React.useState("");
  const [saved, setSaved] = React.useState(
    currentUser.groupBookmarks.includes(thread._id)
  );

  const postComment = async () => {
    if (comment.length > 0) {
      const taggedUsers = new Set();

      const allUsernames = comment.match(usernameRegex);
      comments.forEach(({ author }) => {
        const { username } = author;

        if (!taggedUsers.has(username) && allUsernames.includes(username)) {
          taggedUsers.add(author._id);
        }
      });

      const userArray = Array.from(taggedUsers);

      await createComment(null, thread._id, comment, userArray);
      window.location.reload();
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

  return (
    <div className={styles.ThreadPage}>
      <TopNavBar
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
              <Icon icon={bxsBookmark} height="18px" />
            ) : (
              <Icon icon={bxBookmark} height="18px" />
            )}
          </button>
        }
      />
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
              <div>
                <h5 className={styles.ThreadAuthor}>
                  {thread.author.username}
                </h5>
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
        {comments.map((comment) => (
          <ThreadComment
            key={comment._id}
            comment={comment}
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
            onChange={(event) => setComment(event.target.value)}
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
