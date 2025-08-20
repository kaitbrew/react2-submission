import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard/ProductCard";

describe("ProductCard component", () => {
  const album = {
    id: 42,
    name: "Test Latte",
    description: "A test description",
    artist: "Testland",
    price: 2.5,
  };

  beforeEach(() => {
    render(<ProductCard album={album} />);
  });

  it("renders the album name", () => {
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Latte"
    );
  });

  it("renders the description", () => {
    expect(screen.getByText(/A test description/i)).toBeInTheDocument();
  });

  it("renders the artist", () => {
    expect(screen.getByText(/Artist: Testland/i)).toBeInTheDocument();
  });

  it("renders the price formatted to two decimals", () => {
    expect(screen.getByText("$2.50")).toBeInTheDocument();
  });
});