import { useEffect, useState } from "react";
import type { Product } from "../types";

export default function useProducts () {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: Product[] = await response.json();
        if (!cancelled) {
          setProducts(data);
        }
    }
        catch (err: any) {
         console.error("Failed to fetch products:", err);
          if (!cancelled) {
            setError(err.message || "Failed to fetch products");
          }
         } finally {
            if (!cancelled) setLoading(false);
          }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}