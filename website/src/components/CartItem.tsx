import React from "react";
import { useCart } from "../state/cart";

interface Marca {
  idMarca: number;
  nombreMarca: string;
  stock: number;
}

interface CartItemProps {
  product: {
    productId: number;
    id: number;
    name: string;
    image: string;
    precio: number;
    qty: number;
    marcaSeleccionada: string;
    marcas: Marca[]; // Aquí está la propiedad marcas
  };
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="relative flex w-full flex-row justify-between px-1 py-4 border-b border-neutral-300 dark:border-neutral-700">
      <div className="absolute z-40 -mt-2 ml-[55px]">
        <button
          onClick={() =>
            removeFromCart(product.productId, product.marcaSeleccionada)
          }
          aria-label="Remove cart item"
          className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 text-white transition-all duration-200 cursor-pointer"
        >
          X
        </button>
      </div>

      <div className="z-30 flex flex-row space-x-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
          <img
            className="h-full w-full object-cover"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="flex flex-1 flex-col text-base">
          <span>{product.name}</span>
          <p className="text-sm text-neutral-500">
            {product.marcaSeleccionada}
          </p>
        </div>
      </div>

      <div className="flex h-16 flex-col justify-between ml-1">
        <p>৳ {product.precio}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              decreaseQty(product.productId, product.marcaSeleccionada)
            }
            className="ease flex h-full min-w-[36px] max-w-[36px] items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
          >
            -
          </button>
          <p>{product.qty}</p>
          <button
            onClick={() =>
              increaseQty(product.productId, product.marcaSeleccionada)
            }
            className="ease flex h-full min-w-[36px] max-w-[36px] items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
