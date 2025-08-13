import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "../useProducts";
import { beforeEach, it, expect, vi } from "vitest";

  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              uuid: "1",
              name: "Alpha",
              price: 10,
              description: "",
              productImage: "",
              category: "",
            },
          ]),
      })
    ) as unknown as typeof fetch;
  });

  it("fetches products", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
  });
});
