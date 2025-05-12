// src/components/CartButton.tsx
import { useStore } from "@nanostores/react";
import { isCartOpen, toggleCart } from "../state/cartUI";
import { cart } from "../state/cart";

export const CartButton = () => {
  const open = useStore(isCartOpen);
  const cartItems = useStore(cart);
  const totalItems = cartItems.reduce(
    (acc: any, item: { qty: any }) => acc + item.qty,
    0
  );
  return (
    <div className="nav-icons">
      <div className="icon-wrapper">
        <button
          className="menu-item"
          onClick={toggleCart}
          aria-label="Abrir carrito"
        >
          <i className="fas fa-shopping-cart"></i>
        </button>
        <div className="two-badge-cart">{totalItems}</div>
      </div>

      <div className="icon-wrapper">
        <button className="menu-item" aria-label="Favoritos">
          <i className="fas fa-heart"></i>
        </button>
        <div className="two-badge-wishlist">0</div>
      </div>
    </div>
  );
};
