import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as api from "../api/albums";
import EditAlbumForm from "../components/EditAlbumForm/EditAlbumForm";

// Mock the GET fetch for the specific Album ID once
const mockAlbum = {
  id: "1",
  name: "TestAlbum",
  description: "A test description",
  artist: "Testland",
  price: 2.5,
};

beforeAll(() => {
  global.fetch = vi.fn((url) => {
    if (url.endsWith(`/albums/${mockAlbum.id}`)) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAlbum),
      });
    }
    return Promise.reject(new Error("Unexpected URL: " + url));
  });
});

describe("EditAlbumForm", () => {
  const onUpdatedMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Spy on updateAlbum
    vi.spyOn(api, "updateAlbum").mockResolvedValue({
      ...mockAlbum,
      name: "Updated album",
    });
    // Spy on deleteAlbum also
    vi.spyOn(api, "deleteAlbum").mockResolvedValue({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form fields populated from fetched data", async () => {
    render(<EditAlbumForm id={mockAlbum.id} onUpdated={onUpdatedMock} />);

    // 1) Wait for the form heading to confirm data has loaded
    await screen.findByRole("heading", {
      level: 3,
      name: new RegExp(`Edit “${mockAlbum.name}”`),
    });

    // 2) Now wait for each input to receive its value
    const nameInput = await screen.findByDisplayValue(mockAlbum.name);
    expect(nameInput).toBeInTheDocument();

    expect(screen.getByDisplayValue(mockAlbum.description)).toBeInTheDocument();

    expect(screen.getByDisplayValue(mockAlbum.artist)).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(mockAlbum.price.toString())
    ).toBeInTheDocument();
  });

  it("submits updated values and shows success message", async () => {
    render(<EditAlbumForm id={mockAlbum.id} onUpdated={onUpdatedMock} />);

    // Wait for form to load
    await screen.findByRole("heading", {
      level: 3,
      name: new RegExp(`Edit “${mockAlbum.name}”`),
    });

    // Change the Name field
    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: "Updated TestAlbum" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Update Album/i }));

    // Wait for updateAlbum to be called with correct args
    await waitFor(() => {
      expect(api.updateAlbum).toHaveBeenCalledWith(mockAlbum.id, {
        name: "Updated TestAlbum",
        description: mockAlbum.description,
        artist: mockAlbum.artist,
        price: mockAlbum.price,
      });
    });

    // Confirm the callback fired
    expect(onUpdatedMock).toHaveBeenCalled();

    // Finally, check for the success message
    expect(
      await screen.findByText(/Album updated successfully!/i)
    ).toBeInTheDocument();
  });

  it("calls deleteAlbum and shows delete success message", async () => {
    render(<EditAlbumForm id={mockAlbum.id} onUpdated={onUpdatedMock} />);
    await screen.findByRole("heading", {
      level: 3,
      name: /Edit “TestAlbum”/i,
    });

    fireEvent.click(screen.getByRole("button", { name: /Delete Album/i }));

    await waitFor(() => {
      expect(api.deleteAlbum).toHaveBeenCalledWith("1");
    });
    expect(onUpdatedMock).toHaveBeenCalled();
    expect(
      await screen.findByText(/Album deleted successfully!/i)
    ).toBeInTheDocument();
  });
});