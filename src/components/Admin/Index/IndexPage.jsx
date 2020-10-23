import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import urls from "../../../../utils/urls";
import classes from "./IndexPage.module.scss";

const IndexPage = () => (
  <div className={classes.root}>
    <h1>Admin</h1>
    <Link href={urls.pages.app.admin.invite}>
      <a>Create Invitation Code</a>
    </Link>

    <Link href={urls.pages.app.admin.reports}>
      <a>View Reported Content</a>
    </Link>
  </div>
);

export default IndexPage;
