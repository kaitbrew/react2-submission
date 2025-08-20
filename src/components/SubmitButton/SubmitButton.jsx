import React from "react";
import Button from "@mui/material/Button";
import styles from "./SubmitButton.module.css";

// SubmitButton wraps MUI Button for consistent theme
// Props: children (node - button label/context)

function SubmitButton({ children }) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      className={styles.button}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;