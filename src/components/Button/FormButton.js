import React from "react";
import styles from "./FormButton.module.css";

const FormButton = ({ onClick, text }) => {
  return (
    <span className={styles.formButton} onClick={onClick}>
      {text}
    </span>
  );
};

export default FormButton;
