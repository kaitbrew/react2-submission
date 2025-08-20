import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// 1) Mock useFetch so ShopPage gets our fake albums immediately
vi.mock("../hooks/useFetch", () => ({
  default: () => ({
    data: [
      {
        id: 1,
        name: "album1",
        description: "desc1",
        artist: "artist1",
        price: 4.5,
      },
      {
        id: 2,
        name: "album2",
        description: "desc2",
        artist: "artist2",
        price: 5.0,
      },
    ],
    loading: false,
    error: "",
  }),
}));

import ShopPage from "../components/ShopPage/ShopPage";

describe("ShopPage", () => {
  it("renders all album cards and filters based on search input", async () => {
    render(<ShopPage />);

    // Should show two album cards initially
    const cards = await screen.findAllByRole("heading", { level: 2 });
    expect(cards).toHaveLength(2);

    // Search for "mocha"
    const input = screen.getByLabelText(/Search albums/i);
    fireEvent.change(input, { target: { value: "album2" } });

    // Now only the "album2" card remains
    expect(
      screen.getByRole("heading", { level: 2, name: /album2/i })
    ).toBeInTheDocument();

    const filtered = screen.getAllByRole("heading", { level: 2 });
    expect(filtered).toHaveLength(1);
  });
});