import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
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

const ViewGroup = ({ currentUser, groupid, groupData, threads }) => {
  const [joined, setJoined] = React.useState(false);
  const [sortedBy, setSortedBy] = React.useState("latest comment");
  const [adminTab, setAdminTab] = React.useState(false);
  const [isAdmin, setAdmin] = React.useState(false);

  const groupAction = async () => {
    if (joined) {
      await unfollowGroup(groupid);
      setJoined(false);
    } else {
      await followGroup(groupid);
      setJoined(true);
    }
  };

  React.useEffect(() => {
    if (currentUser.groups.includes(groupid)) {
      setJoined(true);
    }

    if (
      currentUser.role === "Ambassador" ||
      currentUser._id === groupData.admin
    ) {
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
        <Link href={urls.pages.app.groupList}>
          <div>
            <Icon className="Back" icon={bxArrowBack} width="18px" />
          </div>
        </Link>

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
              <ThreadPost key={thread._id} {...thread} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

ViewGroup.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  groupid: PropTypes.string.isRequired,
  groupData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      iconUrl: PropTypes.string.isRequired,
      parentId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      postedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ViewGroup;
