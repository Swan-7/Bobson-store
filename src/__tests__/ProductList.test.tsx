import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";

const mockProducts = [
  { id: 1, name: "Alpha", price: 1, image: "" },
  { id: 2, name: "Beta", price: 2, image: "" },
];

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    } as Response)
  ) as any;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Home", () => {
  it("renders products", async () => 
    {
     render(
    <CartProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </CartProvider>
  );
    expect(await screen.findByText("Alpha")).toBeDefined();
    expect(await screen.findByText("Beta")).toBeDefined();
  });
});
