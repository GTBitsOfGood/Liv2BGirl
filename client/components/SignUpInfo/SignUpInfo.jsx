import React from "react";
import { Button, ButtonGroup, Input, Form } from "reactstrap";
import { Link } from "next/link";
import urls from "../../../utils/urls";

const SignUpInfo = ({ values, setValues, setStageCompleted }) => {
  const { email, password, invCode } = values;

  React.useEffect(() => {
    if (email.length > 0 && password.length > 0 && invCode.length > 0) {
      setStageCompleted(true);
    }
  }, [email, password, invCode]);

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
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
          className="form-control transparent-input custom-input"
          type="text"
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
          className="form-control transparent-input custom-input"
          type="password"
          placeholder="Password"
        />
        <Input
          value={invCode}
          onChange={event => {
            setInvCode(event.target.value);
          }}
          className="form-control transparent-input custom-input"
          type="text"
          placeholder="Invitation Code"
        />
      </Form>
    </div>
  );
};

export default SignUpInfo;
