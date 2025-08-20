import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { deleteAlbum, updateAlbum } from "../../api/albums";
import TextInput from "../TextInput/TextInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./EditAlbumForm.module.css";

// EditAlbumForm loads an existing album ID
// Also allows edits and calls updateAlbum on submit
// Props include the album ID to edit & the onUpdated function (callback after successful update)

function EditAlbumForm({ id, onUpdated }) {
  const {
    data: album,
    loading,
    error,
  } = useFetch(`http://localhost:4000/albums/${id}`);

  // Form state
  const [fields, setFields] = useState({
    name: "",
    description: "",
    artist: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  // Populate form when the album loads
  useEffect(() => {
    if (album) {
      setFields({
        name: album.name,
        description: album.description,
        artist: album.artist,
        price: album.price.toString(),
      });
      setMessage("");
    }
  }, [album]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    // Basic validation
    const { name, description, artist, price } = fields;
    if (!name || !description || !artist || !price) {
      return setMessage("All fields are required.");
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return setMessage("Price must be a non-negative number.");
    }

    try {
      await updateAlbum(id, { name, description, artist, price: priceNum });
      setMessage("Album updated successfully!");
      onUpdated(); // notify parent to refresh list if needed
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  async function handleDelete() {
    setMessage("");
    try {
      await deleteAlbum(id);
      setMessage("Album deleted successfully!");
      onUpdated();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  if (loading) return <p>Loading Album…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Edit “{album.name}”</h3>
      <TextInput
        label="Name"
        name="name"
        value={fields.name}
        onChange={handleChange}
      />
      <TextInput
        label="Description"
        name="description"
        value={fields.description}
        onChange={handleChange}
      />
      <TextInput
        label="Artist"
        name="artist"
        value={fields.artist}
        onChange={handleChange}
      />
      <TextInput
        label="Price"
        name="price"
        type="number"
        value={fields.price}
        onChange={handleChange}
      />

      {message && (
        <div
          className={
            message.startsWith("Error") ? styles.error : styles.success
          }
        >
          {message}
        </div>
      )}

      <SubmitButton>Update Album</SubmitButton>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDelete}
      >
        Delete Album
      </button>
    </form>
  );
}

export default EditAlbumForm;