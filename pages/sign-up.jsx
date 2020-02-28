import React from "react";
<<<<<<< HEAD
import { Button } from "reactstrap";
import { Link } from "next/link";
import urls from "../utils/urls";

const SignUp = () => {
=======
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import { Link } from "next/link";
import { signUp } from "../client/actions/api";
import urls from "../utils/urls";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
>>>>>>> b627e6e5bdf511a75be9820cecd2751d75b944ae
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invCode, setInvCode] = React.useState("");

<<<<<<< HEAD
=======
  const handleSignUp = async () => {
    await signUp(username, password, email);

    return router.push({
      pathname: urls.pages.index
    });
  };

>>>>>>> b627e6e5bdf511a75be9820cecd2751d75b944ae
  return (
    <div>
      <Button
        style={{ WebkitTextFillColor: "#111111", backgroundColor: "lightGray" }}
        className="logo"
        disabled
      >
<<<<<<< HEAD
        Logo
      </Button>
      <br />
      <span className="signin-group">
        <Button tag={Link} href={urls.pages.signUp} className="signUp">
          SIGN UP
        </Button>
        <Button tag={Link} href={urls.pages.signIn} className="signIn">
          SIGN IN
        </Button>
      </span>
      <form>
        <input
          onChange={event => {
=======
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
>>>>>>> b627e6e5bdf511a75be9820cecd2751d75b944ae
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
<<<<<<< HEAD
          type="text"
=======
          type="password"
>>>>>>> b627e6e5bdf511a75be9820cecd2751d75b944ae
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
<<<<<<< HEAD
        tag={Link}
        href={urls.pages.avatar}
        style={{ WebkitTextFillColor: "#111111" }}
        className="button"
      >
        Sign Up
=======
        style={{ WebkitTextFillColor: "#111111" }}
        className="button"
        onClick={handleSignUp}
      >
        {" Sign Up "}
>>>>>>> b627e6e5bdf511a75be9820cecd2751d75b944ae
      </Button>
    </div>
  );
};
<<<<<<< HEAD
export default SignUp;
=======

export default SignUp;
>>>>>>> b627e6e5bdf511a75be9820cecd2751d75b944ae
