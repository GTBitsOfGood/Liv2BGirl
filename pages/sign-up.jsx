import React from "react";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import { Link } from "next/link";
import { signUp } from "../client/actions/api";
import urls from "../utils/urls";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invCode, setInvCode] = React.useState("");

  const handleSignUp = async () => {
    await signUp(username, password, email);

    return router.push({
      pathname: urls.pages.index
    });
  };

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
      <Button
        tag={Link}
        href={urls.pages.signUp}
        color="primary"
        className="signUp"
      >
        {" SIGN UP "}
      </Button>
      <Button tag={Link} href={urls.pages.signIn} className="signIn">
        {" SIGN IN "}
      </Button>
      <form>
        <input
          onChange={event => {
            setUsername(event.target.value);
          }}
          style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="form-control transparent-input"
          type="text"
          placeholder="Username"
        />
        <br />
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
        <input
          onChange={event => {
            setInvCode(event.target.value);
          }}
          style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="form-control transparent-input"
          type="text"
          placeholder="Invitation Code"
        />
        <br />
      </form>
      <Button
        style={{ WebkitTextFillColor: "#111111" }}
        className="button"
        onClick={handleSignUp}
      >
        {" Sign Up "}
      </Button>
    </div>
  );
};

export default SignUp;
