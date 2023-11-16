// components/auth/Register.jsx
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import image from "../../images/bose.jpg";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    img: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
    city: "",
    phone: "",
    password: "",
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Basic validation checks while typing
    const newErrors = { ...errors };

    switch (id) {
      case "username":
        newErrors.username = value.trim() ? "" : "Username is required";
        break;
      case "email":
        newErrors.email =
          value.trim() && validateEmail(value)
            ? ""
            : "Please enter a valid email ending with @nitk.edu.in";
        break;
      case "phone":
        newErrors.phone =
          /^\d+$/.test(value) && value.length === 10? ""
            : "Please enter a valid 10-digit phone number";
        break;
      case "password":
        newErrors.password = validatePassword(value)
          ? ""
          : "Password must be at least 10 characters long, contain one capital letter, and one special character";
        break;
      default:
        break;
    }

    setCredentials((prev) => ({ ...prev, [id]: value }));
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
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

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@nitk\.edu\.in$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
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
            value={credentials.username}
            onChange={handleChange}
          />
          {errors.username && <span className="err">{errors.username}</span>}
          <input
            type="text"
            id="email"
            className="login-input"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />
          {errors.email && <span className="err">{errors.email}</span>}
          <input
            type="text"
            id="country"
            className="login-input"
            placeholder="Country"
            value={credentials.country}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            className="login-input"
            placeholder="City"
            value={credentials.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="phone"
            className="login-input"
            placeholder="Phone"
            value={credentials.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="err">{errors.phone}</span>}
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          {errors.password && <span className="err">{errors.password}</span>}
          <button
            disabled={loading}
            type="submit"
            style={{ width: "18rem", margin: "0" }}
            className="btn"
            onClick={handleSubmit}
            id="liveAlertBtn"
          >
            Submit{" "}
          </button>

          {error && <span className="err">{error}</span>}
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

