import React from "react";
import styles from "./Button.module.css";
import { NavLink } from "react-router-dom";

const Button = ({ to, onClick, text }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
       <span> {text} </span> 
      </NavLink>
    </div>
  );
};

export default Button;
