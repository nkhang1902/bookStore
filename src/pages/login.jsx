import React, { useState } from "react";
import css from "./login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log("Đăng nhập thành công");
        // history.push("/");
        // return <Link to="/signup"/>
      })
      .catch((error) => {
        console.log(error);
        console.log("Đăng nhập thất bại");
      });
  };

  return (
    <div className={css.container}>
      <div className={css.heading}>Login as Existing Customer</div>
      <form className={css.loginForm} onSubmit={handleLogin}>
        <label for="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          secureTextEntry={true}
        />
        <div className={css.rememberMe}>
          <input type="checkbox" /> Remember me
        </div>

        <p>
          By creating an account, you agree to Bookshop’s{" "}
          <Link to="">Privacy Notice</Link> and <Link to="">Terms of Use</Link>.
        </p>
        <button className={css.buttonLogin} type="submit">
          LOGIN
        </button>
        <p>
          or <Link to="/signup">Create a new account</Link> |
          <Link to="">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
