import React from "react";
import PropTypes from "prop-types";
import { Link } from "next/link";

// Icons
import { Icon } from "@iconify/react";
import arrowRightAlt2 from "@iconify/icons-dashicons/arrow-right-alt2";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";

// Stylings
import "./ProfilePage.scss";

// Components
import { Button } from "reactstrap";
import GroupCard from "../Group/GroupCard";
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
      <div className="profile-pg-nav">
        <Button tag={Link} className="profile-back" href="/app/">
          <Icon className="back-profile" icon={bxArrowBack} width="18px" />
        </Button>
        <img className="navbar-logo" src={logo} alt="Liv2BGirl Logo" />
        <div />
      </div>
      <div className="profile-header">
        <img
          className="profile-avatar"
          src="https://picsum.photos/100/100"
          alt="profile Avatar"
        />
        <div className="profile-title">
          <h2 className="profile-name">{userid}</h2>
          <h3 className="profile-stats">15 yo • 10th grade</h3>
          <h4 className="profile-description">
            Discription Lorem ipsum dolor sit amet, elit
          </h4>
        </div>
      </div>
      <div className="profile-page page">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h4>Interests</h4>
          <Button className="profile-right-arrow">
            <Icon icon={arrowRightAlt2} />
          </Button>
        </div>
        <div className="interests-row">
          {interestData.map(interest => (
            <span className="interest-pill">{interest}</span>
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
          <Button className="profile-right-arrow">
            <Icon icon={arrowRightAlt2} />
          </Button>
        </div>
        <div className="subscription-row">
          {subscriptionData.map(subscription => (
            <div className="subscription-card">
              <img
                className="subscription-card-img"
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
          <Button className="profile-right-arrow">
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
