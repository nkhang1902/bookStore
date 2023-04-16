import React, { useState } from "react";
import css from "./signup.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleReg = () => {

  }

  return (
    <div className={css.container}>
      <div className={css.heading}>Create an Account</div>
      <div className={css.title}>
        Create an account for fast checkout, special coupon codes, wishlists,
        and order history.
      </div>
      <form className={css.signUpForm} onSubmit={handleReg}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        <label for="passwordConfirm">Password Confirmation</label>
        <input
          type="passwordConfirm"
          id="passwordConfirm"
          name="passwordConfirm"
        />
        <div className={css.checkBox}>
          <input type="checkbox" /> Send me emails about new books, authors, and
          bookstores from Bookshop.
        </div>

        <p>
          By creating an account, you agree to Bookshop’s{" "}
          <a href={""}>Privacy Notice</a> and <a href={""}>Terms of Use</a>.
        </p>
        <button className={css.buttonSignUp} type="summit">
          CREATE
        </button>
        <p>
          or <a href={""}>Login as Existing Customer</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
