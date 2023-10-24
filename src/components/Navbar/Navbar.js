import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import Button from "../Button/Button";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      {user ? (
        <ul className={styles.link_list}>
          <li>
            <Button to="/" text="HOME" />
          </li>
          <li>
            <Button to="/customerRegister" text="Meu Cadastro" />
          </li>
          <li>
            <Button to="/login" text="Entre" />
          </li>
          <li>
            <Button to="/" text="Sair" onClick={logout} />
          </li>
        </ul>
      ) : (
        <ul className={styles.link_list}>
          <li>
            <Button to="/" text="HOME" />
          </li>
          <li>
            <Button to="/register" text="Crie a sua conta " />
          </li>
          <li>
            <Button to="/login" text="Entre" />
          </li>
         
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
