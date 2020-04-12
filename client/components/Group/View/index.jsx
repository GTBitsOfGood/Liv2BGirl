import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import commentPlusOutline from "@iconify/icons-mdi/comment-plus-outline";

// API Call
import { followGroup, unfollowGroup } from "../../../actions/User";
import { getGroup } from "../../../actions/Group";

// Components
import ThreadPost from "../Thread/Post";

// Logo for Header
import logo from "../../../../public/img/logo.png";

// Stylings
import styles from "./viewgroup.module.scss";

// Navigation
import urls from "../../../../utils/urls";

const ViewGroup = props => {
  const { groupid } = props;
  const [joined, setJoined] = useState(false);
  const [sortedBy, setSortedBy] = useState("latest comment");
  const [groupData, setGroupData] = useState(null);

  const groupAction = () => {
    const userid = "123456789";

    if (joined) {
      unfollowGroup(groupid, userid);
      setJoined(false);
    } else {
      followGroup(groupid, userid);
      setJoined(true);
    }
  };

  useEffect(() => {
    getGroup(groupid).then(res => {
      if (res) setGroupData(res);
    });
  }, []);

  return (
    <>
      <div className="TopNav">
        <Link href={urls.pages.app.groupList}>
          <div>
            <Icon className="Back" icon={bxArrowBack} width="18px" />
          </div>
        </Link>
        <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
        <div />
      </div>

      {groupData && (
        <>
          <div className={styles.GroupHeader}>
            <img
              className={styles.GroupAvatar}
              src="https://picsum.photos/100/100"
              alt="Group Avatar"
            />

            <div className={styles.GroupInfo}>
              <h3 className={styles.GroupName}>{groupData.name}</h3>
              <h4 className={styles.GroupDescription}>
                {groupData.description}
              </h4>
            </div>
            <button
              type="button"
              className={styles.GroupJoin}
              onClick={groupAction}
            >
              {joined ? "Leave" : "Join"}
            </button>
          </div>
          <div className="Page">
            <div className={styles.GroupTopBar}>
              <h6>Sort by </h6>
              <select
                className={styles.GroupSelect}
                onClick={event => setSortedBy(event.target.value)}
              >
                <option>latest comment</option>
                <option>latest post</option>
              </select>

              <button
                type="button"
                className={styles.CreateBtn}
                disabled={!joined}
              >
                <Link href={`/app/groups/${groupid}/new-thread`}>
                  <div>
                    <Icon
                      className={styles.AddPost}
                      width="15px"
                      icon={commentPlusOutline}
                    />
                  </div>
                </Link>
              </button>
            </div>
            {/* {fakeThreads.map(thread => (
          <ThreadPost
            key="Thread"
            title={thread.title}
            summary={thread.summary}
            author={thread.username}
            comments={thread.comments}
          />
        ))} */}
          </div>
        </>
      )}
    </>
  );
};

ViewGroup.propTypes = {
  groupid: PropTypes.string.isRequired,
};

export default ViewGroup;
