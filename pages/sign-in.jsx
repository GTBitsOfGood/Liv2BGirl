import React from "react";
import { Button } from "reactstrap";
import { Link } from "next/link";
import urls from "../utils/urls";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div>
      <Button
        style={{ WebkitTextFillColor: "#111111", backgroundColor: "lightGray" }}
        className="logo"
        disabled
      >
        {" Logo "}
      </Button>
      <br />
      <Button tag={Link} href={urls.pages.signUp} className="signUp">
        {" SIGN UP "}
      </Button>
      <Button
        tag={Link}
        href={urls.pages.signIn}
        color="primary"
        className="signIn"
      >
        {" SIGN IN "}
      </Button>
      <form>
        <input
          onChange={event => {
            setEmail(event.target.value);
          }}
          style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="form-control transparent-input"
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          onChange={event => {
            setPassword(event.target.value);
          }}
          style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="form-control transparent-input"
          type="password"
          placeholder="Password"
        />
        <br />
        <br />
      </form>
      <Button style={{ WebkitTextFillColor: "#111111" }} className="button">
        {" Sign In"}
      </Button>
    </div>
  );
};
export default SignUp;
