import { useState } from "react";

// Custom hook to manage form field state as an object
// Provides values, change handler, & reset function

function useFormFields(initialState) {
  // Fields object will store current values
  const [fields, setFields] = useState(initialState);

  // Change handler for input elements
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function resetFields() {
    // Reset fields back to their initial values
    setFields(initialState);
  }

  return [fields, handleChange, resetFields];
}

export default useFormFields;