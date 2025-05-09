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
}

export default function AddToCartButton({ productId, marcas }: Props) {
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
    <form onSubmit={handleAddToCart} className="space-y-2">
      <select
        className="border rounded px-2 py-1 w-full mt-6"
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

      <div className="relative group">
        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[#00619a] text-white py-2 px-2 rounded-md font-semibold mb-8">
          Add To Cart
        </button>
      </div>
    </form>
  );
}
