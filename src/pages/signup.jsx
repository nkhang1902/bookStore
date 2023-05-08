import React, { useState } from "react";
import css from "./signup.module.css";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
    }
    console.log("sigup");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("userSignUp", user);
        console.log("Đăng ký thành công");
        return <Link to="/login"/>
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log("Đăng ký thất bại");
      });
  };
  return (
    <div className={css.container}>
      <div className={css.heading}>Create an Account</div>
      <div className={css.title}>
        Create an account for fast checkout, special coupon codes, wishlists,
        and order history.
      </div>
      <form className={css.signUpForm}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="passwordConfirm">Password Confirmation</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className={css.checkBox}>
          <input type="checkbox" /> Send me emails about new books, authors, and
          bookstores from Bookshop.
        </div>

        <p style={{marginTop: '10px'}}>
          By creating an account, you agree to Bookshop’s{" "}
          <a href={""}>Privacy Notice</a> and <a href={""}>Terms of Use</a>.
        </p>
        <button className={css.buttonSignUp} onClick={(e) => handleSubmit(e)}>
          CREATE
        </button>
        <p>
          or <Link to="/login">Login as Existing Customer</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
