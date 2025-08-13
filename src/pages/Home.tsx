import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [sortOption, setSortOption] = React.useState<
    "default" | "price-asc" | "price-desc"
  >("default");

  const filteredProducts = (searchQuery.trim()
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products
  ).sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as typeof sortOption)
            }
            className="border px-2 py-1 rounded"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low - High</option>
            <option value="price-desc">Price: High - Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div>No products match.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.uuid} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
