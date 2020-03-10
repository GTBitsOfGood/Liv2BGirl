import React from "react";
import checkmark from "../../../public/img/checkmark.png";

const RegistrationCompleted = () => (
  <div className="page complete-pg">
    <img className="complete-check" src={checkmark} alt="Checkmark" />
    <h1 className="complete-text">Registration Completed</h1>
  </div>
);

export default RegistrationCompleted;
