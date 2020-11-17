import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Icon } from "@iconify/react";
import arrowRightAlt2 from "@iconify/icons-dashicons/arrow-right-alt2";
import { avatarImg, colorArr } from "../../../utils/avatars";
import GroupCard from "./GroupCard";
import PostCard from "./PostCard";
import TopNavBar from "../TopNavBar";
import styles from "./profile.module.scss";

const ProfilePage = ({ user, userGroups, userPosts }) => (
  <>
    <TopNavBar backAction={Router.back} />
    <div className={styles.ProfileHeader}>
      <div
        className={styles.ProfileAvatar}
        style={{
          backgroundColor: colorArr[user.avatarColor],
        }}
      >
        <img
          className={styles.ProfileAvatarImg}
          src={avatarImg[user.avatar]}
          alt="CreateAvatar"
        />
      </div>
      <div className={styles.ProfileTitle}>
        <h3 className={styles.ProfileName}>{user.username}</h3>
        <h3 className={styles.ProfileStats}>
          {`${user.age} yo • ${user.grade}th grade`}
        </h3>
        <h6 className={styles.ProfileDescription} />
      </div>
    </div>
    <div className={`${styles.ProfilePage} Page`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h4 className={styles.ProfileHeading}>Interests</h4>
        <button type="button" className={styles.ProfileNext}>
          <Icon icon={arrowRightAlt2} />
        </button>
      </div>
      <div className={styles.InterestDeck}>
        {user.interests.map((interest) => (
          <span className={styles.InterestPill} key={interest}>
            {interest}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "40px",
          marginBottom: "25px",
        }}
      >
        <h4 className={styles.ProfileHeading}>Posts</h4>
        <button type="button" className={styles.ProfileNext}>
          <Icon icon={arrowRightAlt2} />
        </button>
      </div>
              <div className={styles.ProfileCardDeck}>
          {userPosts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              createdAt={post.createdAt}
              createdBy={post.createdBy}
              content={post.content}
            />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "40px",
          marginBottom: "25px",
        }}
      >
        <h4 className={styles.ProfileHeading}>Joined Groups</h4>
        <button type="button" className={styles.ProfileNext}>
          <Icon icon={arrowRightAlt2} />
        </button>
      </div>

      <div className={styles.ProfileGroupDeck}>
        {userGroups.map((group) => (
          <GroupCard
            key={group._id}
            id={group._id}
            title={group.name}
            description={group.description}
            image={group.iconUrl}
          />
        ))}
      </div>
    </div>
  </>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    askBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
    groupBookmarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  userGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
    })
  ).isRequired,
};

ProfilePage.defaultProps = {
  user: null,
};

export default ProfilePage;
