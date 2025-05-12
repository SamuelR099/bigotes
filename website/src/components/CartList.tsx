import { useStore } from "@nanostores/react";
import { isCartOpen, closeCart } from "../state/cartUI";
import { useCart } from "../state/cart";
import { CartItem } from "./CartItem";
import React from "react";
export const CartList: React.FC = () => {
  const { cart } = useCart();
  const open = useStore(isCartOpen); // Estado global del carrito
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!open || !isClient) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.qty, 0);
  const tax = parseFloat((subtotal * 0.15).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  return (
    <div className="fixed top-[3.95rem] -right-1 z-50 w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-zinc-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-800">Your Cart</h2>
        <button
          onClick={closeCart} // Usa el estado global
          className="text-zinc-400 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-zinc-500 text-center mt-4">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-zinc-200 max-h-72 overflow-y-auto mb-4">
            {cart.map((product) => (
              <li key={product.productId} className="py-4">
                <CartItem
                  product={{ ...product, marcas: product.marcas || [] }}
                />
              </li>
            ))}
          </ul>

          <div className="space-y-3 text-sm text-zinc-600 border-t pt-4">
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="text-zinc-800">
                ${tax.toLocaleString("es-CO")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between font-semibold text-base text-zinc-800 border-t pt-3">
              <span>Total</span>
              <span>${total.toLocaleString("es-CO")}</span>
            </div>
          </div>

          <a
            href="/checkout"
            className="mt-6 block w-full text-center bg-[#00619a] text-white py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Proceed to Checkout
          </a>
        </>
      )}
    </div>
  );
};
