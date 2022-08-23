import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import loginSchema from "../../validation/loginValidation";
import { authActions } from "../../store/auth";
import jwt_decode from "jwt-decode";
import "./LoginPage.css";

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //for redux actions
  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state) => state.auth.loggedIn);
  // const loggedInIdRedux = useSelector((state) => state.auth.loggedInId);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleOnSubmit = (event) => {
    //prevent the form to do refresh
    if (event) {
      event.preventDefault();
    }

    const validatedValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      //invalid email or password
      dispatch(authActions.logOut());
      toast.error("Email and/or password incorrect");
    } else {
      //email and password is good
      axios
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => {
          dispatch(authActions.login());
          const decoded = jwt_decode(res.data.token);
          const userId = decoded._id;
          const userName = decoded.name;
          const userAddress = decoded.address;
          const userPhone = decoded.phone;
          dispatch(authActions.updatedUser(decoded));
          dispatch(authActions.userId(userId));
          dispatch(authActions.loginUser(userName));
          dispatch(authActions.loginAddress(userAddress));
          dispatch(authActions.loginPhone(userPhone));
          localStorage.setItem("tokenKey", res.data.token);
          if (location.state === undefined || location.state) {
            console.log(location.state);
            history.push("/home");
          } else {
            if (location.state.fromPage) {
              history.push(location.state.fromPage);
            } else {
              history.push("/home");
            }
          }
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data);
          }
          localStorage.clear();
          dispatch(authActions.logOut());
        });
    }
  };

  const memoizedCallback = useCallback(() => {
    // console.log("location.state", location.state);
    if (location.state) {
      if (location.state.email && location.state.password) {
        setEmail(location.state.email);
        setPassword(location.state.password);
        handleOnSubmit();
      }
    }
  }, [location.state, handleOnSubmit]);

  useEffect(() => {
    memoizedCallback();
  }, [location.state, email, password, memoizedCallback]);

  return (
    <form onSubmit={handleOnSubmit} className="loginForm">
      <h1>Login to our site</h1>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Login
      </button>
      {/* like ngIf */}
      {loggedInRedux && (
        <div>
          your email is: {email}
          <br />
          your password is: {password}
        </div>
      )}

      <br />
      <br />

      {!loggedInRedux && (
        <button type="button" className="btn btn-primary btn-sm ">
          <Link className="nav-link text-light" to="/signUpPage">
            Sign Up
          </Link>
        </button>
      )}
    </form>
  );
};

export default LoginPage;
