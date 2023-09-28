import React from "react";
import googleImage from "../../assets/googleImage.png";
import githubImage from "../../assets/githubImage.png";
import twitterImage from "../../assets/twitterImage.png";
import styles from "./Loginpage.module.css";

const googleLogin = () => {
  window.open("http://localhost:4000/auth/google", "_self");
};

const githubLogin = () => {
  window.open("http://localhost:4000/auth/github", "_self");
};

const twitterLogin = () => {
  window.location.href = "http://localhost:4000/auth/twitter";
};

export default function Loginpage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
        <h1>Login</h1>
        <div className={styles.googleContainer} onClick={googleLogin}>
          <img src={googleImage} alt="Google" />
          <p>Login with Google</p>
        </div>

        <div
          className={`${styles.googleContainer} ${styles.githubContainer}`}
          onClick={githubLogin}
        >
          <img src={githubImage} alt="GitHub" />
          <p>Login with GitHub</p>
        </div>

        <div
          className={`${styles.googleContainer} ${styles.twitterContainer}`}
          onClick={twitterLogin}
        >
          <img src={twitterImage} alt="Twitter Icon" />
          <p>Login With Twitter</p>
        </div>
      </div>
    </div>
  );
}
