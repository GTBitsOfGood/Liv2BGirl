import React from "react";
import Link from "next/link";
import routes from "./routes";
import urls from "../../../utils/urls";
import classes from "./IndexHeader.module.scss";

const IndexHeader = () => (
  <>
    <div className={classes.root}>
      <Link href={urls.pages.index}>
        <a className={classes.logo}>Liv2BGirl</a>
      </Link>
      <div className={classes.routes}>
        {routes.map((route) => (
          <Link href={route.path} key={route.name}>
            <a className={classes.route}>{route.name}</a>
          </Link>
        ))}
      </div>
    </div>
    <div className={classes.spacer} />
  </>
);

export default IndexHeader;
