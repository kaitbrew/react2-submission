import React from "react";
import styles from "./ProductCard.module.css";

// ProductCard displays the details of a single album

function ProductCard({ album }) {
  const { name, description, artist, price } = album;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.desc}>{description}</p>
      <p className={styles.artist}>Artist: {artist}</p>
      <p className={styles.price}>${price.toFixed(2)}</p>
    </div>
  );
}

export default ProductCard;