import { motion } from "framer-motion";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-4 rounded shadow-sm"
    >
      <Link to={`/product/${product.uuid}`}>
        <img src={product.productImage} alt={product.name} className="h-40 w-full object-contain rounded" />
        <h3 className="mt-2 font-semibold">{product.name}</h3>
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
        <button
          onClick={() => add(product)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </motion.div>
  );
}
