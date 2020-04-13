import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";

// API Call
import { getUser } from "../../../../actions/User";

// Styling
import { avatarImg, colorArr } from "../../../../../utils/avatars";
import styles from "../thread.module.scss";

// Navigation
import urls from "../../../../../utils/urls";

const ThreadPost = props => {
  const { threadid, title, summary, authorid, postedAt, numComments } = props;

  const [author, setAuthor] = useState("");

  useEffect(() => {
    getUser(authorid).then(res => {
      if (res) setAuthor(res);
    });
  }, []);

  const timeSince = date => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval}y`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval}m`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval}d`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval}h`;
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval}m`;
    }
    return `${Math.floor(seconds)}s`;
  };

  return (
    <button type="button" className={styles.GroupThread}>
      <Link href={urls.pages.app.thread(threadid)}>
        <div>
          <div style={{ display: "flex", marginBottom: "4px" }}>
            <h3 className={styles.ThreadName}>{title}</h3>
            <h6 className={styles.ThreadTime}>{timeSince(postedAt)}</h6>
          </div>

          <h4 className={styles.ThreadSummary}>{summary}</h4>
          <div className={styles.ThreadDetails}>
            <div
              className={styles.AuthorAvatar}
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
            <h4 className={styles.ThreadAuthor}>{author.username}</h4>
            <div className={styles.ThreadComments}>
              <Icon icon={bxCommentDetail} />
              <h6>{numComments}</h6>
            </div>
          </div>
        </div>
      </Link>
    </button>
  );
};

ThreadPost.propTypes = {
  threadid: PropTypes.string.isRequired,
  authorid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
  postedAt: PropTypes.string.isRequired,
};

export default ThreadPost;
