// src/components/CartWrapper.tsx
import { useStore } from "@nanostores/react";
import { isCartOpen } from "../state/cartUI";
import { CartList } from "./CartList"; // Asegúrate de tener CartList exportado correctamente

export const CartWrapper = () => {
  const open = useStore(isCartOpen);

  return (
    <div
      className="cart-container"
      style={{ display: open ? "block" : "none" }}
    >
      <CartList />
    </div>
  );
};
