import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import { AuthContext } from "../../context/AuthContext";
import image from "../../images/bose.jpg"
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const {loading, error, dispatch } = useContext(AuthContext);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))

  }
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({type:"LOGIN_SUCCESS",payload:res.data.details});
      navigate("/");
      
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE",payload:error.response.data});
      setShowErrorPopup(true);
      setTimeout(()=>{
        setShowErrorPopup(false);
      },5000)
    }
  }
    const closeErrorPopup = () => {
    // Close the error popup
    setShowErrorPopup(false);
  }
  return (
    <div className="main-login">
      <div className="login">
        <div className="left-login">
          <img src={image} alt="..." />
        </div>
        <div className="right-login">
          <h2>Sign in</h2>
          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="Username"
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
            Submit
          </button>

          {/* Error popup */}
          {showErrorPopup && (
            <div className="err">
              <span className="close-btn" onClick={closeErrorPopup}>
                &times;
              </span>
              <p>{error.message}</p>
            </div>
          )}

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

export default Login;
