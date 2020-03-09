import React from "react";
import { useRouter } from "next/router";
import { Button, ButtonGroup, Input, Form } from "reactstrap";
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
      pathname: urls.pages.index,
    });
  };

  return (
    <div className="page account" style={{ marginBottom: 0 }}>
      <div className="logo" />
      <ButtonGroup className="login-buttons">
        <Button tag={Link} href={urls.pages.signUp} className="signUp">
          SIGN UP
        </Button>
        <Button
          tag={Link}
          href={urls.pages.signIn}
          className="signIn"
          style={{
            background: "#E0E0E0",
            color: "#828282",
            fontWeight: "normal",
          }}
        >
          SIGN IN
        </Button>
      </ButtonGroup>

      <Form>
        <Input
          onChange={event => {
            setUsername(event.target.value);
          }}
          className="form-control transparent-input custom-input"
          type="text"
          placeholder="Username"
        />
        <Input
          onChange={event => {
            setEmail(event.target.value);
          }}
          className="form-control transparent-input custom-input"
          type="text"
          placeholder="Email"
        />
        <Input
          onChange={event => {
            setPassword(event.target.value);
          }}
          className="form-control transparent-input custom-input"
          type="password"
          placeholder="Password"
        />
        <Input
          onChange={event => {
            setInvCode(event.target.value);
          }}
          className="form-control transparent-input custom-input"
          type="text"
          placeholder="Invitation Code"
        />
      </Form>
      <Button className="account-button" onClick={handleSignUp}>
        SIGN UP
      </Button>
    </div>
  );
};

export default SignUp;
