import React from "react";
import { Link, useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { useCartState } from "../context/CartContext";

export default function Header() {
  const cart = useCartState();
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQ(params.get("q") || "");
  }, [location]);

  const handleChange = (value: string) => {
    setQ(value);
    navigate({
      pathname: "/",
      search: value ? createSearchParams({ q: value }).toString() : "",
    }, { replace: true });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Bobson Store</Link>

        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => handleChange(e.target.value)}
            className="border px-3 py-1 rounded"
            placeholder="Search products..."
            aria-label="Search products"
          />
          {/* Keep Search button optional; clicking just keeps same behavior */}
          <button
            onClick={() =>
              navigate({
                pathname: "/",
                search: q ? createSearchParams({ q }).toString() : "",
              })
            }
            className="bg-blue-600 text-white px-3 rounded"
          >
            Search
          </button>
        </div>

        <Link to="/cart" className="relative">
          <span className="inline-block px-2 py-1 border rounded">Cart</span>
          {cart.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cart.items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
