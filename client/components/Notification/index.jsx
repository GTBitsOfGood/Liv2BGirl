import React from "react";
import Router from "next/router";

// Icons
import { Icon } from "@iconify/react";
import bxCommentDetail from "@iconify/icons-bx/bx-comment-detail";
import bxMessageRoundedError from "@iconify/icons-bx/bx-message-rounded-error";

// Styling
import styles from "./notification.module.scss";

const fakeNotifications = [
  {
    type: "group",
    action: "reply",
    date: 3,
    name: "[USERNAME]",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
  },
  {
    type: "group",
    action: "remove",
    date: 4,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
  },
  {
    type: "askme",
    action: "comment",
    date: 2,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
  },
  {
    type: "askme",
    action: "answer",
    name: "Ambassador A",

    date: 7,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
  },
  {
    type: "askme",
    action: "feature",
    date: 1,
    name: "Ambassador B",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
  },
];

const Notification = () => {
  const sortByDate = (a, b) => {
    return new Date(a.date) - new Date(b.date);
  };

  const getResponse = notification => {
    const { type, action, date, message, name } = notification;

    if (type === "group") {
      if (action === "reply") return `${name} replied to your comment`;
      if (action === "remove")
        return "Your post has been removed by a moderator";
    }
    if (action === "comment") return "New comment on your question";

    if (action === "answer") return `${name} answered your question`;

    if (action === "feature") return `Your question was featured by ${name}`;
    return "Notification!";
  };

  return (
    <>
      <div className="TopNav">
        <div className="Avatar" />
        <h3>Notifications</h3>
        <div />
      </div>

      <div className={styles.NotificationPage}>
        {fakeNotifications.sort(sortByDate).map(notification => (
          <div className={styles.NotificationCard}>
            <div className={styles.TopLine}>
              {notification.type === "group" ? (
                <Icon className={styles.Icon} icon={bxCommentDetail} />
              ) : (
                <Icon className={styles.Icon} icon={bxMessageRoundedError} />
              )}
              <h6 className={styles.Response}>{getResponse(notification)}</h6>
              <h6 className={styles.NotificationDate}>
                {`${notification.date}h`}
              </h6>
            </div>
            <h4 className={styles.Message}>{notification.message}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
