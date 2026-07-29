import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown
} from "react-bootstrap";

import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaUser,
  FaBoxOpen,
  FaShoppingBag,
  FaSignOutAlt
} from "react-icons/fa";

import "./Navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function CustomNavbar() {

  

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const[search, setSearch] = useState("");

  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("username");
    navigate("/login");

  };

  return (

    <header className="navbar-wrapper">

  {/* TOP BAR */}
  <div className="top-bar">

    {/* Logo */}
    <Link to="/" className="logo">
      <span className="blue">Razz</span>
      <span className="gold">Stock</span>
    </Link>

   {/* Search */}
    <form
      className="search-area"
      onSubmit={(e) => {

        e.preventDefault();

        if(search.trim()) {
          navigate(`/search?keyword=${search}`);
        }

      }}
    >

      <input
        type="text"
        placeholder="Search for Products..."
        className="search-input"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />


      <button 
        className="search-button"
        type="submit"
      >
        <FaSearch />
      </button>


    </form>

    {/* Right */}
    <div className="right-menu">

      <Link to="/wishlist" className="icon-btn">
        <FaHeart />
      </Link>

      <Link to="/cart" className="icon-btn">
        <FaShoppingCart />
      </Link>

      <Link to="/orders" className="icon-btn">
        <FaShoppingBag />
      </Link>

      {!token ? (
        <>
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>
        </>
      ) : (
       <div className="profile-box">

    <div className="profile-avatar">
        <FaUserCircle />
    </div>

    <div className="profile-info">
        <small>Hello,</small>
        <span>{username}</span>
    </div>

    <div className="profile-dropdown">

        <div className="dropdown-header">

            <FaUserCircle className="dropdown-avatar" />

            <h6>{username}</h6>

            <p>Welcome to RazzStock</p>

        </div>

        <Link to="/profile">
            👤 My Profile
        </Link>

        <Link to="/orders">
            📦 My Orders
        </Link>

        <Link to="/wishlist">
            ❤️ Wishlist
        </Link>

        <button
            className="logout-btn"
            onClick={handleLogout}
        >
            🚪 Logout
        </button>

    </div>

</div>


      )}

    </div>

  </div>

  {/* SECOND BAR */}

  <div className="bottom-bar">

    <Link to="/">Home</Link>

    <Link to="/products">Products</Link>

    <a href ="#categories">Categories</a>

  </div>

</header>
  
  );

}

export default CustomNavbar;