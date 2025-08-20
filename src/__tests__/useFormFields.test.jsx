import { describe, test, expect } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import useFormFields from "../hooks/useFormFields";

function TestForm() {
  const [fields, handleChange, resetFields] = useFormFields({ foo: "" });
  return (
    <div>
      <input
        name="foo"
        value={fields.foo}
        onChange={handleChange}
        data-testid="input"
      />
      <button onClick={resetFields} data-testid="reset">
        Reset
      </button>
      <p data-testid="value">{fields.foo}</p>
    </div>
  );
}

describe("useFormFields", () => {
  test("updates and resets fields correctly", () => {
    render(<TestForm />);
    const input = screen.getByTestId("input");
    const value = screen.getByTestId("value");
    const resetBtn = screen.getByTestId("reset");

    // change value
    fireEvent.change(input, { target: { name: "foo", value: "bar" } });
    expect(value.textContent).toBe("bar");

    // reset
    fireEvent.click(resetBtn);
    expect(value.textContent).toBe("");
  });
});