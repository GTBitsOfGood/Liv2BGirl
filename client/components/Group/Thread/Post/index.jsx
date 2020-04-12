import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";

// Styling
import styles from "../thread.module.scss";

const ThreadPost = props => {
  const { title, summary, author, comments } = props;

  return (
    <button type="button" className={styles.GroupThread}>
      <Link href={`/app/groups/thread/${title}`}>
        <div>
          <div style={{ display: "flex", marginBottom: "4px" }}>
            <h3 className={styles.ThreadName}>{title}</h3>
            <h6 className={styles.ThreadTime}>5h</h6>
          </div>

          <h4 className={styles.ThreadSummary}>{summary}</h4>
          <div className={styles.ThreadDetails}>
            <img
              className={styles.AuthorAvatar}
              src="https://picsum.photos/50/50"
              alt="Group Avatar"
            />
            <h4 className={styles.ThreadAuthor}>{author}</h4>
            <div className={styles.ThreadComments}>
              <Icon icon={bxCommentDetail} />
              <h6>{comments}</h6>
            </div>
          </div>
        </div>
      </Link>
    </button>
  );
};

ThreadPost.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
};

export default ThreadPost;
