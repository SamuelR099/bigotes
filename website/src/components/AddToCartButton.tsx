import { useState } from "react";
import { addToCart } from "../state/cart";

interface Marca {
  idMarca: number;
  nombreMarca: string;
  stock: number;
}

interface Props {
  productId: string;
  marcas: Marca[];
  className?: string;
}

export default function AddToCartButton({
  productId,
  marcas,
  className,
}: Props) {
  const [qty, setQty] = useState(1);
  const [marcaId, setMarcaId] = useState<number | null>(null);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();

    const productIdNumber = Number(productId);
    if (marcaId === null) {
      alert("Selecciona una marca antes de añadir al carrito.");
      return;
    }

    try {
      await addToCart(productIdNumber, qty, marcaId);
      alert("Producto añadido al carrito.");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Ha ocurrido un error desconocido.");
      }
    }
  };

  return (
    <form onSubmit={handleAddToCart}>
      <select
        className="border rounded p-[10px] w-full mb-4"
        value={marcaId ?? ""}
        onChange={(e) => setMarcaId(Number(e.target.value))}
        required
      >
        <option value="">Selecciona una marca</option>
        {marcas.map((marca) => (
          <option key={marca.idMarca} value={marca.idMarca}>
            {marca.nombreMarca} (Stock: {marca.stock})
          </option>
        ))}
      </select>

      {/* Botón con separación superior */}
      <div className="flex justify-center">
        <button
          type="submit"
          className={`relative w-[100px] h-[35px] bg-[#00619a] text-white rounded-md text-sm font-bold flex items-center justify-center transition duration-700 hover:bg-[#004a74] group${
            className ? " " + className : ""
          }`}
        >
          <span className="absolute inset-0  flex items-center justify-center transition-transform duration-500 group-hover:opacity-0">
            Add To Cart
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="currentColor"
              className="bi bi-cart2"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
