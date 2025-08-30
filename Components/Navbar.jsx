import React, { useState } from "react";
import "../Global_css/Navbar.css";
import { Search, User, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const categories = ["Beauty", "Revamp", "Native"];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">uc</div>
          <div className="logo-text">
            {location.pathname !== "/checkout" ? (
              <>
                <div className="logo-main">Urban</div>
                <div className="logo-sub">Company</div>
              </>
            ) : (
              <div className="logo-main">Checkout</div>
            )}
          </div>
        </div>

        {location.pathname !== "/checkout" ? (
          <>
            <div className="navbar-nav">
              {categories.map((category) => (
                <button key={category} className="nav-link">
                  {category}
                </button>
              ))}
            </div>

            <div className="navbar-right">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for 'Kitchen cleaning'"
                  className="search-input"
                />
              </div>

              <button className="profile-button">
                <User className="profile-icon" />
              </button>

              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </>
        ) : null}
      </div>

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
  );
};

export default Navbar;
