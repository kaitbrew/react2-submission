import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProductForm from "../ProductForm/ProductForm";
import EditAlbumForm from "../EditAlbumForm/EditAlbumForm";
import styles from "./AdminPortal.module.css";

// AdminPortal renders two sections
// First is the ProductForm for creating new albums
// Second is the dropdown/EditAlbumForm to update existing albums

function AdminPortal() {
  // Fetch all albums so you can pick one to edit
  const {
    data: albums = [],
    loading,
    error,
  } = useFetch("http://localhost:4000/albums");
  const [selectedId, setSelectedId] = useState(null);

  function handleUpdated() {
    // After an edit, re-fetch the albums list by clearing selection
    setSelectedId(null);
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>Add a New album</h1>
        <ProductForm />
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h2>Edit Existing album</h2>

        {loading && <p>Loading albums…</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && (
          <select
            value={selectedId || ""}
            onChange={(e) => setSelectedId(e.target.value)}
            className={styles.select}
          >
            <option value="" disabled>
              -- Select a album to edit --
            </option>
            {albums.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        )}

        {selectedId && (
          <EditAlbumForm id={selectedId} onUpdated={handleUpdated} />
        )}
      </section>
    </div>
  );
}

export default AdminPortal;