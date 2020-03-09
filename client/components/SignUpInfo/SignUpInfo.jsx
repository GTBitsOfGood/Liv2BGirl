import React from "react";
import { Button } from "reactstrap";
import { Link } from "next/link";
import urls from "../../../utils/urls";

const SignUpInfo = ({ values, setValues }) => {
  const { email, password, invCode } = values;

  return (
    <div>
      <Button
        style={{ WebkitTextFillColor: "#111111", backgroundColor: "lightGray" }}
        className="logo"
        disabled
      >
        Logo
      </Button>
      <br />
      <Button
        tag={Link}
        href={urls.pages.signUp}
        color="primary"
        className="signUp"
      >
        SIGN UP
      </Button>
      <Button tag={Link} href={urls.pages.signIn} className="signIn">
        SIGN IN
      </Button>
      <form>
        <input
          value={email}
          onChange={event => {
            const { value } = event.target;

            setValues({
              email: value,
            });
          }}
          style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="form-control transparent-input"
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={event => {
            const { value } = event.target;

            setValues({
              password: value,
            });
          }}
          style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="form-control transparent-input"
          type="password"
          placeholder="Password"
        />
        <br />
        <input
          value={invCode}
          onChange={event => {
            const { value } = event.target;

            setValues({
              invCode: value,
            });
          }}
          style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="form-control transparent-input"
          type="text"
          placeholder="Invitation Code"
        />
      </form>
    </div>
  );
};

export default SignUpInfo;
