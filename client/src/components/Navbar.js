import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
      }}
    >
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#333",
          }}
        >
          Fashion Social App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#555",
                  marginRight: "1rem",
                }}
                activestyle={{ color: "#000", textDecoration: "underline" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/channels"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#555",
                  marginRight: "1rem",
                }}
                activestyle={{ color: "#000", textDecoration: "underline" }}
              >
                Channels
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/profile"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#555",
                }}
                activestyle={{ color: "#000", textDecoration: "underline" }}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
