import React from "react";
import { Button, ButtonGroup, Input, Form } from "reactstrap";
import { Link } from "next/link";
import urls from "../../../utils/urls";

const SignUpInfo = ({ values, setValues }) => {
  const { email, password, invCode } = values;

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
            const { value } = event.target;

            setValues({
              email: value,
            });
          }}
          className="form-control transparent-input custom-input"
          type="text"
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={event => {
            const { value } = event.target;

            setValues({
              password: value,
            });
          }}
          className="form-control transparent-input custom-input"
          type="password"
          placeholder="Password"
        />
        <Input
          value={invCode}
          onChange={event => {
            const { value } = event.target;

            setValues({
              invCode: value,
            });
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
