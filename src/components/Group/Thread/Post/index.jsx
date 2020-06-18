import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";
import { Node } from "slate";
import { timeSince } from "./utils";
import urls from "../../../../../utils/urls";
import { avatarImg, colorArr } from "../../../../../utils/avatars";
import styles from "../thread.module.scss";

const ThreadPost = ({
  _id,
  group,
  title,
  content,
  postedAt,
  author,
  numComments,
}) => {
  const body =
    JSON.parse(content)
      .map((n) => Node.string(n))
      .join(" ")
      .substring(0, 100) + "...";

  return (
    <Link
      href={urls.pages.app.groups.group.threads.view()}
      as={urls.pages.app.groups.group.threads.view(group, _id)}
    >
      <a className={styles.GroupThread}>
        <div style={{ display: "flex", marginBottom: "4px" }}>
          <h3 className={styles.ThreadName}>{title}</h3>
          <h6 className={styles.ThreadTime}>{timeSince(postedAt)}</h6>
        </div>
        <h4 className={styles.ThreadSummary}>{body}</h4>
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
      </a>
    </Link>
  );
};

ThreadPost.propTypes = {
  _id: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
};

export default ThreadPost;
