import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const mockAdd = vi.fn();

vi.mock("../context/CartContext", async () => {
  const actual = await vi.importActual("../context/CartContext");
  return {
    ...actual,
    useCart: () => ({ add: mockAdd }),
  };
});

const product = {
  uuid: "1",
  name: "Alpha",
  price: 10,
  description: "",
  productImage: "",
  category: "",
};

beforeEach(() => {
  mockAdd.mockClear();
});

describe("ProductCard", () => {
  it("renders product info", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText("Alpha")).toBeTruthy();
    expect(screen.getByText("$10.00")).toBeTruthy();
  });

  it("calls add to cart on button click", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    const [button] = screen.getAllByRole("button", { name: /add/i });
    fireEvent.click(button);

    expect(mockAdd).toHaveBeenCalledWith(product);
  });
});
