import React, { useEffect } from "react";
import Link from "next/link";
import urls from "../../../utils/urls";

// Styling
import styles from "./signup.module.scss";

const SignUpInfo = ({ values, setValues, setStageCompleted }) => {
  const { email, password, invCode } = values;

  useEffect(() => {
    if (email.length > 0 && password.length > 0 && invCode.length > 0) {
      setStageCompleted(true);
    }
  }, [email, password, invCode]);

  return (
    <div className="Page" style={{ marginBottom: "60px" }}>
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
          onChange={event => {
            const { value } = event.target;
            setValues({
              email: value,
            });
          }}
          className={styles.Input}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={event => {
            const { value } = event.target;
            setValues({
              password: value,
            });
          }}
          className={styles.Input}
          type="password"
          placeholder="Password"
        />
        <input
          value={invCode}
          onChange={event => {
            const { value } = event.target;
            setValues({
              invCode: value,
            });
          }}
          className={styles.Input}
          type="text"
          placeholder="Invitation Code"
          style={{ marginBottom: 0 }}
        />
      </form>
    </div>
  );
};

export default SignUpInfo;
