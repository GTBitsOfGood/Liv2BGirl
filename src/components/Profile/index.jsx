import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Icon } from "@iconify/react";
import arrowRightAlt2 from "@iconify/icons-dashicons/arrow-right-alt2";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import logo from "../../../public/img/logo.png";
import { avatarImg, colorArr } from "../../../utils/avatars";
import GroupCard from "./GroupCard";
import styles from "./profile.module.scss";

const ProfilePage = ({ user, userGroups }) => (
  <div>
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
      <div />
    </div>
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
        <h6 className={styles.ProfileDescription}>
          Description Lorem ipsum dolor sit amet, elit test overflow
        </h6>
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
        <h4 className={styles.ProfileHeading}>Joined Groups</h4>
        <button type="button" className={styles.ProfileNext}>
          <Icon icon={arrowRightAlt2} />
        </button>
      </div>

      <div className={styles.ProfileGroupDeck}>
        {userGroups.map((group) => (
          <GroupCard
            id={group._id}
            title={group.name}
            description={group.description}
            image={group.image || "https://picsum.photos/100/100"}
          />
        ))}
      </div>
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  userGroups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

ProfilePage.defaultProps = {
  user: null,
};

export default ProfilePage;
