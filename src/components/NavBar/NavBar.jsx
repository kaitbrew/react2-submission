import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

// NavBar component renders the top level navigation links
// Highlights the active route via CSS Module
function NavBar() {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Shop
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Admin
      </NavLink>
    </nav>
  );
}

export default NavBar;