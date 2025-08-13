import { describe, it, expect } from "vitest";
import { cartReducer } from "../context/CartContext";
import type { Product } from "../types";

const p1: Product = {
  uuid: '1',
  name: "A",
  price: 10,
  description: "Test product",
  productImage: "test-image.jpg",
  category: "Test Category"
};

describe("cartReducer", () => {
  it("adds item", () => {
    const state = { items: [] };
    const next = cartReducer(state, { type: "ADD_ITEM", product: p1, quantity: 1 });
    expect(next.items.length).toBe(1);
    expect(next.items[0].quantity).toBe(1);
  });

  it("increments quantity if same item added", () => {
    const state = { items: [{ product: p1, quantity: 1 }] };
    const next = cartReducer(state, { type: "INCREMENT_ITEM", productId: p1.uuid });
    expect(next.items[0].quantity).toBe(2);
  });

  it("decrements and removes at zero", () => {
    const state = { items: [{ product: p1, quantity: 1 }] };
    const next = cartReducer(state, { type: "DECREMENT_ITEM", productId: '1' });
    expect(next.items.length).toBe(0);
  });
});
