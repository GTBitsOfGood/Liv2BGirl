import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { login } from "../../actions/api";
import urls from "../../../utils/urls";

// Styling
import global from "../components.global.scss";
import styles from "./signin.module.scss";

const SignInComponent = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () =>
    login(email, password)
      .then(() =>
        router.push({
          pathname: urls.pages.app.home,
        })
      )
      .catch(error => {
        // eslint-disable-next-line no-alert
        window.alert(error.message);
      });

  return (
    <div className={global.Page}>
      <div className={styles.Logo} />
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
          onChange={event => setEmail(event.target)}
          className={styles.Input}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={event => setPassword(event.target)}
          className={styles.Input}
          type="password"
          placeholder="Password"
        />
        <h4 className={styles.ForgotPass}>Forgot?</h4>
        <div className={styles.RememberMe}>
          <label className={styles.CheckboxLabel} htmlFor="rememberMe">
            <input
              id="rememberMe"
              className={styles.CustomCheckbox}
              type="checkbox"
            />
            <h4>Remember Me</h4>
          </label>
        </div>
      </form>
      <button className="account-button" onClick={handleLogin}>
        SIGN IN
      </button>
    </div>
  );
};

export default SignInComponent;
