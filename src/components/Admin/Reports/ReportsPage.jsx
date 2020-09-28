import React from "react";
import classes from "./ReportsPage.module.scss";

const ReportsPage = () => {
  const reports = [];
  const [numReports, setNumReports] = React.useState(reports.length);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Reports</h1>
        <p>
          If someone posts stuff you dont like, you can yeet it off this
          platform from here.
        </p>
      </div>
    </div>
  );
};

export default ReportsPage;
