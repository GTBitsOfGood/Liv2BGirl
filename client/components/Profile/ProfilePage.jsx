import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";
import arrowRightAlt2 from "@iconify/icons-dashicons/arrow-right-alt2";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

// Stylings
import styles from "./profile.module.scss";

// Components
import GroupCard from "./GroupCard";
import logo from "../../../public/img/logo.png";

// Dummy Data
const interestData = ["Music", "College"];

const subscriptionData = [
  "https://picsum.photos/100/100",
  "https://picsum.photos/100/100",
  "https://picsum.photos/100/100",
  "https://picsum.photos/100/100",
];

const groupData = [
  {
    title: "Group 1",
    description: "Description 1",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Group 2",
    description: "Description 2",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Group 3",
    description: "Description 3",
    image: "https://picsum.photos/50/50",
  },
];

const ProfilePage = props => {
  const { userid } = props;

  return (
    <div>
      <div className="TopNav">
        <Link href="/app">
          <Icon className="Back" icon={bxArrowBack} width="18px" />
        </Link>
        <img className="Logo" src={logo} alt="Liv2BGirl Logo" />
        <div />
      </div>
      <div className={styles.ProfileHeader}>
        <img
          className={styles.ProfileAvatar}
          src="https://picsum.photos/100/100"
          alt="profile Avatar"
        />
        <div className={styles.ProfileTitle}>
          <h3 className={styles.ProfileName}>{userid}</h3>
          <h3 className={styles.ProfileStats}>15 yo • 10th grade</h3>
          <h6 className={styles.ProfileDescription}>
            Discription Lorem ipsum dolor sit amet, elit
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
          {interestData.map(interest => (
            <span className={styles.InterestPill}>{interest}</span>
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
          <h4 className={styles.ProfileHeading}>Subscriptions</h4>
          <button type="button" className={styles.ProfileNext}>
            <Icon icon={arrowRightAlt2} />
          </button>
        </div>
        <div className={styles.SubscriptionDeck}>
          {subscriptionData.map(subscription => (
            <div className={styles.SubscriptionCard}>
              <img
                className={styles.SubscriptionImg}
                src={subscription}
                alt="Subscription Pic"
              />
            </div>
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
          {groupData.map(group => (
            <GroupCard
              title={group.title}
              description={group.description}
              image={group.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  userid: PropTypes.string.isRequired,
};

export default ProfilePage;
