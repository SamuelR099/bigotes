// src/components/CartButton.tsx
import { useStore } from "@nanostores/react";
import { isCartOpen, toggleCart } from "../state/cartUI";

export const CartButton = () => {
  const open = useStore(isCartOpen);

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
        <div className="two-badge-cart">0</div>
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
