import React, { useState } from "react";
import css from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
  };

  return (
    <div className={css.container}>
      <div className={css.heading}>Login as Existing Customer</div>
      <form className={css.loginForm} onSubmit={handleLogin}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        <div className={css.rememberMe}>
          <input type="checkbox" /> Remember me
        </div>

        <p>
          By creating an account, you agree to Bookshop’s{" "}
          <a href={""}>Privacy Notice</a> and <a href={""}>Terms of Use</a>.
        </p>
        <button className={css.buttonLogin} type="summit">
          LOGIN
        </button>
        <p>
          or <a href={""}>Create a new account</a> |{" "}
          <a href={""}>Forgot Password?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
