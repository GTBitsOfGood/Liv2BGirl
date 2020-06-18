import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import logo from "../../../public/static/img/logo.png";
import { avatarImg, colorArr } from "../../../utils/avatars";
import classes from "./TopNavBar.module.scss";
import urls from "../../../utils/urls";

const TopNavBar = ({
  currentUser,
  backUrl,
  backUrlAs,
  backAction,
  title,
  leftNode,
  rightNode,
  className,
}) => {
  let leftSide = leftNode ?? <div />;
  if (currentUser != null) {
    leftSide = (
      <Link
        href={urls.pages.app.profile.view()}
        as={urls.pages.app.profile.view(currentUser?._id)}
      >
        <div
          className={classes.Avatar}
          style={{
            backgroundColor: colorArr[currentUser?.avatarColor],
          }}
        >
          <img
            className={classes.AvatarImg}
            src={avatarImg[currentUser?.avatar]}
            alt="User Avatar"
          />
        </div>
      </Link>
    );
  }
  if (backUrl != null) {
    const optionals = {};

    if (backUrlAs != null) {
      optionals.as = backUrlAs;
    }

    leftSide = (
      <Link href={backUrl} {...optionals}>
        <a>
          <Icon className={classes.Back} icon={bxArrowBack} width="18px" />
        </a>
      </Link>
    );
  }
  if (backAction != null) {
    leftSide = (
      <Icon
        className={classes.Back}
        icon={bxArrowBack}
        width="18px"
        onClick={backAction}
      />
    );
  }

  return (
    <div className={clsx(classes.TopNav, "GlobalTopNavBar", className)}>
      {leftSide}
      {title != null ? (
        <h3>{title}</h3>
      ) : (
        <Link href={urls.pages.app.index}>
          <a>
            <img className={classes.Logo} src={logo} alt="Liv2BGirl Logo" />
          </a>
        </Link>
      )}
      {rightNode}
    </div>
  );
};

TopNavBar.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
  }),
  backUrl: PropTypes.string,
  backUrlAs: PropTypes.string,
  backAction: PropTypes.func,
  title: PropTypes.string,
  leftNode: PropTypes.node,
  rightNode: PropTypes.node,
  className: PropTypes.string,
};

TopNavBar.defaultProps = {
  currentUser: null,
  backUrl: null,
  backUrlAs: null,
  backAction: null,
  title: null,
  leftNode: null,
  rightNode: <div />,
};

export default TopNavBar;
