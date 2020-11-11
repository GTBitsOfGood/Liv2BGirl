import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { login } from "../../actions/User";
import urls from "../../../utils/urls";
import logo from "../../../public/static/img/logo.png";
import styles from "./signin.module.scss";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRemember] = useState(false);

  const handleLogin = async () =>
    login(null, email, password)
      .then(() =>
        Router.replace({
          pathname: urls.pages.app.index,
        })
      )
      .catch((error) => {
        window.alert(error.message);
      });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="Page" style={{ marginBottom: "20px" }}>
        <img className={styles.Logo} src={logo} alt="App logo" />
        <div className={styles.LoginButtons}>
          <Link href={urls.pages.signUp}>
            <button className={styles.SignUp} type="button">
              <h4>SIGN UP</h4>
            </button>
          </Link>
          <Link href={urls.pages.signIn}>
            <button className={styles.SignIn} type="button">
              <h4>SIGN IN</h4>
            </button>
          </Link>
        </div>

        <form className={styles.Form}>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.Input}
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.Input}
            type="password"
            placeholder="Password"
          />
          <h4 className={styles.ForgotPass}>Forgot?</h4>
          <div className={styles.RememberMe}>
            <input
              id="rememberMe"
              className={styles.CustomCheckbox}
              type="checkbox"
              onClick={() => setRemember(!rememberMe)}
            />
            <label className={styles.CheckboxLabel} htmlFor="rememberMe">
              <h4>Remember Me</h4>
            </label>
          </div>
        </form>
      </div>
      <button
        type="submit"
        className="NextButton"
        onClick={handleLogin}
        style={{ backgroundColor: "orange", color: "white" }}
      >
        <h1>SIGN IN</h1>
      </button>
    </div>
  );
};

export default SignInComponent;
