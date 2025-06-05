import { Button } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const authMember = null;

  const handleLinkClick = () => {
    setIsOpen(false); // Link bosilganda menyuni yopish
  };

  return (
    <div className="mobile-menu">
      <div
        className="mobile-menu-box"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="menu first"></div>
        <div className="menu middle"></div>
        <div className="menu last"></div>
      </div>
      {isOpen && (
        <div className="menu-links">
          <NavLink
            to={"/"}
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to={"/product"}
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Product
          </NavLink>
          {authMember ? (
            <NavLink
              to={"/orders"}
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Orders
            </NavLink>
          ) : null}
          {authMember ? (
            <NavLink
              to={"/member-page"}
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              My Page
            </NavLink>
          ) : null}
          <NavLink
            to={"/help"}
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Help
          </NavLink>
          {!authMember ? (
            <Button
              onClick={handleLinkClick}
              variant="contained"
              style={{ background: "blue", color: "white" }}
            >
              Login
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
