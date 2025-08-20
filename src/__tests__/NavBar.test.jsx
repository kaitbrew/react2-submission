import React from "react";
import { vi } from "vitest";

// 1) Mock useFetch so StoreBanner and ShopPage resolve immediately
vi.mock("../hooks/useFetch", () => ({
  default: (url) => {
    if (url.endsWith("/store_info/1")) {
      return {
        data:     {
      "id": "1",
      "name": "Needle & Groove Records",
      "description": "An independent record store specializing in alternative, rock, and rare vinyl finds.",
      "phone_number": "555-9876"
    },
        loading: false,
        error: "",
      };
    }
    if (url.endsWith("/albums")) {
      return { data: [], loading: false, error: "" };
    }
    return { data: null, loading: false, error: "" };
  },
}));

// 2) Stub BrowserRouter → MemoryRouter
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    BrowserRouter: ({ children }) => (
      <actual.MemoryRouter>{children}</actual.MemoryRouter>
    ),
  };
});

import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Navigation / NavBar", () => {
  it("defaults to Home and shows the Store banner", async () => {
    render(<App />);
    // The banner <h1> comes from StoreBanner
    const banner = await screen.findByRole("heading", {
      level: 1,
      name: /Needle & Groove Records/i,
    });
    expect(banner).toBeInTheDocument();
  });

  it("navigates to Shop when clicking the Shop link", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /shop/i }));
    // Instead of a heading, we assert the Search input exists on ShopPage
    expect(await screen.findByLabelText(/Search albums/i)).toBeInTheDocument();
  });

  it("navigates to Admin when clicking the Admin link", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /admin/i }));
    const adminHeading = await screen.findByRole("heading", {
      level: 1,
      name: /Add a New Album/i,
    });
    expect(adminHeading).toBeInTheDocument();
  });
});