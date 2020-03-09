import React from "react";
import { useRouter } from "next/router";
import { Button, ButtonGroup, CustomInput, Input, Form } from "reactstrap";
import { Link } from "next/link";
import { login } from "../client/actions/api";
import urls from "../utils/urls";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    await login(email, password);

    return router.push({
      pathname: urls.pages.index,
    });
  };

  return (
    <div className="page account">
      <div className="logo" />
      <ButtonGroup className="login-buttons">
        <Button
          tag={Link}
          href={urls.pages.signUp}
          className="signUp"
          style={{
            background: "#E0E0E0",
            color: "#828282",
            fontWeight: "normal",
          }}
        >
          SIGN UP
        </Button>
        <Button tag={Link} href={urls.pages.signIn} className="signIn">
          SIGN IN
        </Button>
      </ButtonGroup>

      <Form className="signin-form">
        <Input
          onChange={event => {
            setEmail(event.target.value);
          }}
          className="transparent-input custom-input"
          type="text"
          placeholder="Email"
        />
        <Input
          onChange={event => {
            setPassword(event.target.value);
          }}
          style={{ marginBottom: 0 }}
          className="transparent-input custom-input"
          type="password"
          placeholder="Password"
        />
        <Button className="forgot-pass">Forgot?</Button>
        <div>
          <CustomInput type="checkbox" id="rememberMe" label="Remember Me" />
        </div>
      </Form>
      <Button className="account-button" onClick={handleLogin}>
        SIGN IN
      </Button>
    </div>
  );
};
export default SignUp;
