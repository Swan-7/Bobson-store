import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const { add } = useCart();

  if (loading) return <div>Loading...</div>;

  const product = products.find(p => String(p.uuid) === id);
  if (!product) return <div>Product not found</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={product.productImage} alt={product.name} className="rounded object-contain w-full h-96" />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <button onClick={() => add(product)} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
          Add to cart
        </button>
      </div>
    </div>
  );
}
