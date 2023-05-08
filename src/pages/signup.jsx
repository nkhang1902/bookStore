import React, { useState } from "react";
import css from "./signup.module.css";
import { db, auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
    }
    try {
      console.log("sigup");
      createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await addDoc(collection(db, "User"), {
            email: email,
            fullName: firstName + lastName,
            phone: phoneNumber,
            dob: dateOfBirth,
            address: address,
            favourite: [],
            cart: [],            
          });
          console.log("userSignUp", user);
          console.log("Đăng ký thành công");
          navigate('/login');
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      console.log("Đăng ký thất bại");
    }
  };

  return (
    <div className={css.container}>
      <div className={css.heading}>Create an Account</div>
      <div className={css.title}>
        Create an account for fast checkout, special coupon codes, wishlists,
        and order history.
      </div>
      <form className={css.signUpForm}>
        <div className={css.nameBox}>
          <div>
            <label htmlFor="firstName">
              First Name<span>*</span>
            </label>
            <input
              className={css.firstNameBox}
              type="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name<span>*</span>
            </label>
            <input
              className={css.lastNameBox}
              type="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <label htmlFor="phoneNumber">
          Phone Number<span>*</span>
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <label htmlFor="dateOfBirth">Date of birth<span>*</span></label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}        
        />

        <label htmlFor="email">
          Email<span>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">
          Password<span>*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="passwordConfirm">
          Password Confirmation<span>*</span>
        </label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className={css.checkBox}>
          <input type="checkbox" /> Send me emails about new books, authors, and
          bookstores from Bookshop.
        </div>

        <p>
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
