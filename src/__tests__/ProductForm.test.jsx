import { describe, test, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../components/ProductForm/ProductForm";
import * as api from "../api/albums";

vi.mock("../api/albums", () => ({
  createAlbum: vi.fn().mockResolvedValue({ id: 123, name: "Test Album" }),
}));

describe("ProductForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows validation error when fields are empty", async () => {
    render(<ProductForm />);
    fireEvent.click(screen.getByRole("button", { name: /create Album/i }));
    expect(
      await screen.findByText(/all fields are required/i)
    ).toBeInTheDocument();
  });

  test("submits form and shows success message", async () => {
    render(<ProductForm />);
    fireEvent.change(screen.getByLabelText(/Album name/i), {
      target: { name: "name", value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { name: "description", value: "Desc" },
    });
    fireEvent.change(screen.getByLabelText(/artist/i), {
      target: { name: "artist", value: "Artist" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { name: "price", value: "5" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create Album/i }));

    await waitFor(() => {
      expect(api.createAlbum).toHaveBeenCalledWith({
        name: "Test",
        description: "Desc",
        artist: "Artist",
        price: 5,
      });
    });
    expect(
      await screen.findByText(/Album successfully created/i)
    ).toBeInTheDocument();
  });
});