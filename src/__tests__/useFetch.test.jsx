import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useFetch from "../hooks/useFetch";

// A small test component that uses the hook
function TestFetch({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  return <pre data-testid="result">{JSON.stringify(data)}</pre>;
}

describe("useFetch hook", () => {
  const mockData = { foo: "bar" };
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("shows loading then data on success", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    render(<TestFetch url="/test-success" />);
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();

    // wait for data to render
    await waitFor(() =>
      expect(screen.getByTestId("result")).toHaveTextContent('"foo":"bar"')
    );
  });

  it("shows an error message on fetch failure", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Server Error",
    });

    render(<TestFetch url="/test-fail" />);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/Error 500/i)
    );
  });
});