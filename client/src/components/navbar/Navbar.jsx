import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import image from "../navbar/logo.jfif"
const Navbar = () => {
  const navigate =useNavigate();
  const {user,dispatch} = useContext (AuthContext );
  const handleLogin=()=>{
    navigate("/login");
  }

  const handleLogout = async (req,res) => {
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  const handleRegister=async()=>{
    try{
      navigate("/register");
    }catch(error){
      console.error("Register error:",error);
    }
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <img src={image} alt="" className="logoimg" />
          <span className="logo">NITK GUEST HOUSE</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span className="loggedInUser">{user.username}</span>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>Register</button>
            <button className="navButton" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar