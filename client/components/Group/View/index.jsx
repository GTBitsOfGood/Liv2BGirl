import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import commentPlusOutline from "@iconify/icons-mdi/comment-plus-outline";
import dotsHorizontal from "@iconify/icons-mdi/dots-horizontal";
import accountCircleOutline from "@iconify/icons-mdi/account-circle-outline";
import { followGroup, unfollowGroup } from "../../../actions/User";
import ThreadPost from "../Thread/Post";
import AdminTab from "./AdminTab";
import logo from "../../../../public/img/logo.png";
import urls from "../../../../utils/urls";
import styles from "./viewgroup.module.scss";

const ViewGroup = ({ groupid, groupData, threads, currentUser }) => {
  const [joined, setJoined] = React.useState(false);
  const [sortedBy, setSortedBy] = React.useState("latest comment");
  const [adminTab, setAdminTab] = React.useState(false);
  const [isAdmin, setAdmin] = React.useState(false);

  const groupAction = async () => {
    if (joined) {
      await unfollowGroup(groupid, currentUser.id);
      setJoined(false);
    } else {
      await followGroup(groupid, currentUser.id);
      setJoined(true);
    }
  };

  React.useEffect(() => {
    if (currentUser.groups.includes(groupid)) {
      setJoined(true);
    }

    if (currentUser.role === "Ambassador" || currentUser.id === groupData.admin) {
      setJoined(true);
      setAdmin(true);
    }
  }, []);

  const toggle = () => {
    setAdminTab(!adminTab);
  };

  return (
    <>
      {adminTab && <AdminTab onClick={toggle} groupid={groupid} />}
      <div className="TopNav">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => Router.back()}
          onKeyDown={() => Router.back()}
        >
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </div>

        <img className="Logo" src={logo} alt="Liv2BGirl Logo" />

        {groupData && isAdmin ? (
          <Icon
            onClick={() => toggle()}
            className="IconButton"
            icon={dotsHorizontal}
            width="18px"
          />
        ) : (
          <div />
        )}
      </div>

      {groupData && (
        <>
          <div className={styles.GroupHeader}>
            <img
              className={styles.GroupAvatar}
              src="https://picsum.photos/100/100"
              alt="Group Avatar"
            />
            {isAdmin ? (
              <Icon
                className={styles.AdminIcon}
                icon={accountCircleOutline}
                width="15px"
              />
            ) : (
              <div />
            )}

            <div className={styles.GroupInfo}>
              <h3 className={styles.GroupName}>{groupData.name}</h3>
              <h4 className={styles.GroupDescription}>
                {groupData.description}
              </h4>
            </div>
            {isAdmin ? (
              <button type="button" className={styles.GroupJoin}>
                Edit
              </button>
            ) : (
              <button
                type="button"
                className={styles.GroupJoin}
                onClick={groupAction}
              >
                {joined ? "Leave" : "Join"}
              </button>
            )}
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
                <Link href={urls.pages.app.createThread(groupid)}>
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
            {threads.map(thread => (
              <ThreadPost
                key={thread._id}
                threadid={thread._id}
                title={thread.title}
                summary={thread.content}
                authorid={thread.posterId}
                postedAt={thread.postedAt}
                numComments={thread.numComments}
                currentUser={currentUser}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

ViewGroup.propTypes = {
  groupid: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        posterId: PropTypes.string.isRequired,
        groupId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        postedAt: PropTypes.string.isRequired,
      }).isRequired
    ),
  }).isRequired,
};

export default ViewGroup;
