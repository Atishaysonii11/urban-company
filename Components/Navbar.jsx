import React, { useState } from "react";
import "../Global_css/Navbar.css";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2);
  const Navigate = useNavigate();

  const categories = ["Beauty", "Revamp", "Native"];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div
            className="navbar-logo"
            style={{ cursor: "pointer" }}
            onClick={() => Navigate("/")}
          >
            <div className="logo-icon">uc</div>
            <div className="logo-text">
              <div className="logo-main">Urban</div>
              <div className="logo-sub">Company</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {categories.map((category) => (
              <button key={category} className="nav-link">
                {category}
              </button>
            ))}
          </div>

          <div className="navbar-right">
            {/* Search */}
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search for 'Kitchen cleaning'"
                className="search-input"
              />
            </div>

            {/* Cart */}
            <button
              className="cart-button"
              onClick={() => Navigate("/your-cart")}
            >
              <ShoppingCart className="cart-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            {/* Profile */}
            <button className="profile-button">
              <User className="profile-icon" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {categories.map((category) => (
              <button key={category} className="mobile-nav-link">
                {category}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
