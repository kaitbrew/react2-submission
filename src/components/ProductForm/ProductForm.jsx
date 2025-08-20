import React, { useState } from "react";
import useFormFields from "../../hooks/useFormFields";
import { createAlbum } from "../../api/albums";
import TextInput from "../TextInput/TextInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./ProductForm.module.css";

// ProductForm handles creation of a new album
// Validates inputs and displays success/error messages

function ProductForm() {
  const [fields, handleChange, resetFields] = useFormFields({
    name: "",
    description: "",
    artist: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    const { name, description, artist, price } = fields;
    if (!name || !description || !artist || !price) {
      return setError("All fields are required.");
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return setError("Price must be a non-negative number.");
    }

    try {
      await createAlbum({ ...fields, price: priceNum });
      setSuccess("Album successfully created!");
      resetFields();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <TextInput
        label="Album Name"
        name="name"
        value={fields.name}
        onChange={handleChange}
      />
      <TextInput
        label="artist"
        name="artist"
        value={fields.artist}
        onChange={handleChange}
      />
      <TextInput
        label="Description"
        name="description"
        value={fields.description}
        onChange={handleChange}
      />
      <TextInput
        label="Price"
        name="price"
        type="number"
        value={fields.price}
        onChange={handleChange}
      />

      <SubmitButton>Create Album</SubmitButton>
    </form>
  );
}

export default ProductForm;
