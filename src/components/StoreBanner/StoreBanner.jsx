import React from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./StoreBanner.module.css";

// StoreBanner fetches and displays the store_info (name, description, phone number)
// Shows loading and error states accordingly

function StoreBanner() {
  // Fetch the single store_info entry (id = 1)
  const {
    data: store,
    loading,
    error,
  } = useFetch("http://localhost:4000/store_info/1");

  if (loading) {
    return <div className={styles.loading}>Loading store info…</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.banner}>
      <h1>{store.name}</h1>
      <p>{store.description}</p>
      <small>Call us: {store.phone_number}</small>
    </div>
  );
}

export default StoreBanner;