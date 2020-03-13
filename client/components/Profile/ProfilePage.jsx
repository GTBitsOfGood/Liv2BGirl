import React from "react";
import PropTypes from "prop-types";
import { Link } from "next/link";
import { Icon } from "@iconify/react";
import arrowRightAlt2 from "@iconify/icons-dashicons/arrow-right-alt2";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import { Button } from "reactstrap";
import clsx from "clsx";
import GroupCard from "../Group/GroupCard";
import logo from "../../../public/img/logo.png";
import classes from "./ProfilePage.module.scss";

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
      <div className={classes.profilePgNav}>
        <Button tag={Link} className={classes.profileBack} href="/app/">
          <Icon className="back-profile" icon={bxArrowBack} width="18px" />
        </Button>
        <img className={classes.navbarLogo} src={logo} alt="Liv2BGirl Logo" />
        <div />
      </div>
      <div className={classes.profileHeader}>
        <img
          className={classes.profileAvatar}
          src="https://picsum.photos/100/100"
          alt="profile Avatar"
        />
        <div className="profile-title">
          <h2 className={classes.profileName}>{userid}</h2>
          <h3 className={classes.profileStats}>15 yo • 10th grade</h3>
          <h4 className={classes.profileDescription}>
            Discription Lorem ipsum dolor sit amet, elit
          </h4>
        </div>
      </div>
      <div className={clsx("page", classes.profilePage)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h4>Interests</h4>
          <Button className={classes.profileRightArrow}>
            <Icon icon={arrowRightAlt2} />
          </Button>
        </div>
        <div className={classes.interestsRow}>
          {interestData.map(interest => (
            <span className={classes.interestPill}>{interest}</span>
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
          <h4>Subscriptions</h4>
          <Button className={classes.profileRightArrow}>
            <Icon icon={arrowRightAlt2} />
          </Button>
        </div>
        <div className={classes.subscriptionRow}>
          {subscriptionData.map(subscription => (
            <div className={classes.subscriptionCard}>
              <img
                className={classes.subscriptionCardImg}
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
          <h4>Joined Groups</h4>
          <Button className={classes.profileRightArrow}>
            <Icon icon={arrowRightAlt2} />
          </Button>
        </div>

        <div className="profile-group-cards">
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
