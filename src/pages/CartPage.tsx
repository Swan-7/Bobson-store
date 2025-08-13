import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, increment, decrement, remove, total, clear } = useCart();

  if (items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.product.uuid} className="flex items-center gap-4 py-2 border-b">
            <img src={item.product.productImage} className="w-20 h-20 object-contain rounded" alt={item.product.name} />
            <div className="flex-1">
              <div className="font-semibold">{item.product.name}</div>
              <div>${item.product.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => decrement(item.product.uuid)} className="px-2 text-white">-</button>
              <div>{item.quantity}</div>
              <button onClick={() => increment(item.product.uuid)} className="px-2 text-white">+</button>
              <button onClick={() => remove(item.product.uuid)} className="ml-4 text-red-500">Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
        <div className="mt-2">
          <button className="mr-2 bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
          <button onClick={() => clear()} className="bg-gray-200 px-4 py-2 rounded text-white">Clear cart</button>
        </div>
      </div>
    </div>
  );
}
