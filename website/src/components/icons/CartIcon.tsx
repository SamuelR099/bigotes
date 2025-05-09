// components/CartIcon.tsx
import React from "react";
import { useStore } from "@nanostores/react";
import { cart } from "../../state/cart";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon: React.FC = () => {
  const $cart = useStore(cart);

  // Suma total de cantidades en el carrito
  const totalItems = $cart?.reduce((acc, item) => acc + item.cantidad, 0) ?? 0;

  return (
    <div className="relative">
      <FaShoppingCart className="text-2xl" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
