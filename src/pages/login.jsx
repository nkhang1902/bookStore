import React, { useState } from "react";
import css from "./login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Firestore, collection, getDocs, query, where, addDoc, doc } from 'firebase/firestore'
import { useContext, createContext } from "react";
import { db } from "../firebase/config";
import { UserContext } from "../components/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext); // get the setUser function from the context
  const [userData, setUserData] = useState(null); // initialize userData to null
  let navigate = useNavigate();
  console.log(userData);
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log("Đăng nhập thành công");
        const q = query(
          collection(db, "User"),
          where("Email", "==", email)
        );
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(userData);
            setUserData(userData); // update the userData state with the fetched data
            setUser(userData); // update the userData in the context as well
          });
          navigate("/");
        })
        .catch((error) => {
          console.log("Error getting user data:", error);
        });
        
      })
  };

  return (
    <div style={{marginTop: '30px'}} className={css.container}>
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
