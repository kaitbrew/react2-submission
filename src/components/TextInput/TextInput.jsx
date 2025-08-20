import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./TextInput.module.css";

// TextInput wraps MUI TextField with consistent styling
// Props include:
//  - label: string – placeholder and accessibility label
//  - name: string – form field name
//  - value: string|number – controlled value
//  - onChange: function – change handler
//  - type: string – input type (defaults to "text")
//  - error: boolean – whether to show error state
//  - helperText: string – helper or error message

function TextInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  helperText,
}) {
  return (
    <div className={styles.wrapper}>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        error={!!error}
        helperText={helperText}
        variant="outlined"
        fullWidth
      />
    </div>
  );
}

export default TextInput;