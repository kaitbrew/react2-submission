import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

// ProductGrid lays out a grid of album cards.

function ProductGrid({ albums }) {
  return (
    <div className={styles.grid}>
      {albums.map((album) => (
        <ProductCard key={album.id} album={album} />
      ))}
    </div>
  );
}

export default ProductGrid;