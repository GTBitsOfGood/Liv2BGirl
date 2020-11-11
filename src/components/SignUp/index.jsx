import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { verifyEmailUnused } from "../../actions/User";
import { verifyCodeUnused } from "../../actions/InvitationCode";
import urls from "../../../utils/urls";
import logo from "../../../public/static/img/logo.png";
import styles from "./signup.module.scss";

const SignUpInfo = ({ values, setValues, handleNext }) => {
  const { email, password, invCode } = values;

  const goToNext = async () => {
    if (email.length === 0 || password.length === 0 || invCode.length === 0) {
      window.alert("All fields must be answered before continuing!");
    } else {
      const emailUnused = await verifyEmailUnused(null, email).then(
        (unused) => {
          if (!unused) {
            window.alert("This email is already associated with an account!");
          }

          return unused;
        }
      );

      const codeUnused = await verifyCodeUnused(null, invCode)
        .then((unused) => {
          if (!unused) {
            window.alert("This invitation code has already been used!");
          }

          return unused;
        })
        .catch((error) => {
          window.alert(error.message);

          return false;
        });

      if (emailUnused && codeUnused) {
        handleNext();
      }
    }
  };

  return (
    <>
      <div className="Page" style={{ marginBottom: "60px" }}>
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
            onChange={(event) => {
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
            onChange={(event) => {
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
            onChange={(event) => {
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
      <div style={{ display: "flex" }}>
        <button
          type="button"
          className="NextButton"
          onClick={goToNext}
          style={{ backgroundColor: "orange", color: "white" }}
        >
          <h1>SIGN UP</h1>
        </button>
      </div>
    </>
  );
};

SignUpInfo.propTypes = {
  values: PropTypes.shape({
    invCode: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
    avatarColor: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    grade: PropTypes.number.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setValues: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default SignUpInfo;
