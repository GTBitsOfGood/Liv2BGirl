import React from "react";
import Link from "next/link";
import classes from "./Group.module.scss";
import urls from "../../../../../../utils/urls";

const Group = ({ info }) => {
  const { id, name, people, description } = info;

  return (
    <Link href={urls.pages.app.group(id)} prefetch={false}>
      <div className={classes.root}>
        <div className={classes.icon} />
        <div className={classes.info}>
          <p className={classes.name}>{name}</p>
          <p className={classes.peopleCount}>{`${people} people`}</p>
        </div>
        <p className={classes.description}>{description}</p>
      </div>
    </Link>
  );
};

export default Group;
