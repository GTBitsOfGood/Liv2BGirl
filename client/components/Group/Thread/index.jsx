import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxBookmark from "@iconify/icons-bx/bx-bookmark";
import bxsBookmark from "@iconify/icons-bx/bxs-bookmark";

// Components
import CommentCard from "./CommentCard";
import { getCommentsByThread } from "../../../actions/Comment";

// Stylings
import styles from "./thread.module.scss";

const fakeComments = [
  {
    posterId: "CrazyPurpleFox",
    postedAt: "00-00-0000 00:00",
    content:
      "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    posterId: "SadBlueElephant",
    postedAt: "00-00-0000 00:00",
    content:
      "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    posterId: "HappyGreenBear",
    postedAt: "00-00-0000 00:00",
    content:
      "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const ThreadPage = props => {
  const { threadid, author, date, groupid } = props;
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadComments() {
      await getCommentsByThread(threadid)
        .then(res => {
          setComments(res); // TODO: handle design for when there are no comments?
        })
        .catch(error => {
          console.log(error);
          setComments(fakeComments); // TODO: do actual error handling
        });
    }

    loadComments();
  });

  return (
    <div className={styles.ThreadPage}>
      <div className="TopNav">
        <Link href={`/app/groups/${groupid}`}>
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </Link>
        <h3 className={styles.ThreadNavTitle}>Thread</h3>
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
      <div className={`Page ${styles.ThreadMain}`}>
        <div className={styles.ThreadInfo}>
          <img
            className={styles.ThreadGroupAvatar}
            src="https://picsum.photos/100/100"
            alt="Group Avatar"
          />
          <h6 className={styles.ThreadGroupName}>{groupid}</h6>
        </div>
        <h2 className={styles.ThreadName}>{threadid}</h2>
        <div className={styles.ThreadDetails}>
          <img
            className={styles.ThreadAuthorAvatar}
            src="https://picsum.photos/50/50"
            alt="Group Avatar"
          />
          <div>
            <h5 className={styles.ThreadAuthor}>{author}</h5>
            <h6 className={styles.ThreadDate}>{date}</h6>
          </div>
        </div>
        <h4 className={styles.ThreadText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </h4>
      </div>
      <div className={styles.ThreadComments}>
        {comments.map(thread => (
          <CommentCard
            key="Thread"
            author={thread.posterId}
            date={thread.postedAt}
            text={thread.content}
          />
        ))}
      </div>
      <div className={styles.CommentFooter}>
        <img
          className={styles.UserAvatar}
          src="https://picsum.photos/100/100"
          alt="User Avatar"
        />
        <Editor
          apiKey={process.env.TINY_API_KEY}
          initialValue=""
          init={{
            placeholder: "Comment",
            height: 140,
            width: "100%",
            menubar: false,
            statusbar: false,
            toolbar_location: "bottom",
            plugins: ["lists wordcount emoticons"],
            setup: editor => {
              editor.ui.registry.addGroupToolbarButton("alignment", {
                icon: "align-left",
                tooltip: "Alignment",
                items: "alignleft aligncenter alignright alignjustify",
              });
            },
          }}
          toolbar="emoticons bold italic underline alignment bullist"
          onEditorChange={content => setComments(content)}
        />
      </div>
    </div>
  );
};

ThreadPage.propTypes = {
  threadid: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  groupid: PropTypes.string.isRequired,
};

export default ThreadPage;
