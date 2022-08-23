import axios from "axios";
import Joi from "joi-browser";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import registerSchema from "../../validation/registerValidation";
import "./SignUpPage.css";

const SignUpPage = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const validatedValue = Joi.validate(
      { name, email, address, phone, password },
      registerSchema,
      {
        abortEarly: false,
      }
    );

    //add joi validation
    axios
      .post("/users/register", { name, email, address, phone, password })
      .then((res) => {
        console.log("res.data", res.data);
        history.push("/login", { email, password });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <form className="signUpPageForm" onSubmit={handleSignUp}>
      <div className="mb-3">
        <label htmlFor="exampleInputName1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName1"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPhone1" className="form-label">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPhone1"
          aria-describedby="phoneHelp"
          onChange={handlePhoneChange}
          value={phone}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputAddress1" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputAddress1"
          aria-describedby="addressHelp"
          onChange={handleAddressChange}
          value={address}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SignUpPage;
