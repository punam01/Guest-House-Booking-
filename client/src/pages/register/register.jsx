// components/auth/Register.jsx
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import image from "../../images/bose.jpg";
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    //img: undefined,
    city: undefined,
    phone: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/login");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="main-login">
      <div className="login">
        <div className="left-login">
          <img src={image} alt="..." />
        </div>
        <div className="right-login">
          <h2>Create an account</h2>
          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="text"
            id="email"
            className="login-input"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            id="country"
            className="login-input"
            placeholder="Country"
            onChange={handleChange}
          />
          <input
            type="text"
            id="img"
            className="login-input"
            placeholder="Profile Image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            className="login-input"
            placeholder="City"
            onChange={handleChange}
          />
          <input
            type="text"
            id="phone"
            className="login-input"
            placeholder="Phone"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            type="submit"
            style={{ width: "18rem", margin: "0" }}
            className="btn"
            onClick={handleClick}
            id="liveAlertBtn"
          >
            Submit{" "}
          </button>

          {error && <span className="err">{error} </span>}
          <div className="signtxt">
            By signing in or creating an account, you agree with our{" "}
            <span>Terms & conditions</span> and <span>Privacy statement</span>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Register;
