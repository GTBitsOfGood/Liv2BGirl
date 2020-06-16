import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import TopNavBar from "../TopNavBar";
import IndexHeader from "../IndexHeader";
import BottomNavBar from "../BottomNavBar";
import styles from "./Error.module.scss";

const Error = ({ currentUser, statusCode, message }) => {
  const router = useRouter();

  const inApp = router.asPath.startsWith("/app");

  return (
    <>
      {inApp && currentUser != null ? (
        <TopNavBar currentUser={currentUser} />
      ) : (
        <IndexHeader />
      )}
      <div className={styles.root}>
        <h2>
          {statusCode
            ? `A ${statusCode} error occurred on the server :(`
            : "An error occurred on client :("}
        </h2>
        {message && <h4>{message}</h4>}
      </div>
      {inApp && <BottomNavBar />}
    </>
  );
};

Error.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
  statusCode: PropTypes.number.isRequired,
  message: PropTypes.string,
};

Error.defaultProps = {
  currentUser: null,
  message: null,
};

export default Error;
