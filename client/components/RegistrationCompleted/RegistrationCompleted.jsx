import React from "react";
import checkmark from "../../../public/img/checkmark.png";

const RegistrationCompleted = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img
      src={checkmark}
      alt="Checkmark"
      style={{
        flex: 1,
        maxWidth: 150,
        maxHeight: 150,
        marginBottom: 16,
      }}
    />
    <h2>Registration Completed</h2>
  </div>
);

export default RegistrationCompleted;
