//cart.ts
import { atom } from "nanostores";
import { getProductRequest, type Marca } from "./Product";
import { useStore } from "@nanostores/react";

export interface ICartItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  precio: number;
  qty: number;
  stockDisponible: number;
  marcaSeleccionada: string;
  marcas?: Marca[];
}

export const loadingAddCart = atom<boolean>(false);
export const errorAddCart = atom<string | undefined>(undefined);

const initialCart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];

export const cart = atom<Array<ICartItem>>(initialCart);

export const syncCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart.set(JSON.parse(savedCart));
    }
  }
};

export const addToCart = async (
  id: number,
  cantidad: number,
  marcaId: number
): Promise<void> => {
  try {
    errorAddCart.set(undefined);
    loadingAddCart.set(true);

    const producto = await getProductRequest(String(id));
    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    console.log(
      `Esperando producto ID ${id}, recibido producto con ID ${producto.id}`
    );
    console.log(
      "Marcas disponibles en el producto:",
      producto.marcas.map((m) => `ID: ${m.idMarca}, Nombre: ${m.nombreMarca}`)
    );

    // Buscar la marca correcta
    const marcaSeleccionada = producto.marcas.find(
      (marca) => Number(marca.idMarca) === Number(marcaId)
    );

    console.log(
      "Marca seleccionada después de la búsqueda:",
      marcaSeleccionada
    );

    if (!marcaSeleccionada) {
      throw new Error(
        `Marca con ID ${marcaId} no encontrada. Marcas disponibles: ${producto.marcas
          .map((m) => `ID ${m.idMarca}, Nombre ${m.nombreMarca}`)
          .join(", ")}`
      );
    }

    if (marcaSeleccionada.stock < cantidad) {
      throw new Error("Stock insuficiente");
    }

    const cartItems = cart.get();
    const existente = cartItems.find(
      (item) =>
        item.productId === producto.id &&
        item.marcaSeleccionada === marcaSeleccionada.nombreMarca
    );

    if (existente) {
      const actualizado: ICartItem = {
        ...existente,
        qty: existente.qty + cantidad,
      };
      cart.set(
        cartItems.map((item) =>
          item.productId === existente.productId &&
          item.marcaSeleccionada === existente.marcaSeleccionada
            ? actualizado
            : item
        )
      );
    } else {
      const nuevoItem: ICartItem = {
        productId: producto.id,
        name: producto.nombre,
        image: producto.imagenes[0],
        precio: producto.precio,
        qty: cantidad,
        stockDisponible: marcaSeleccionada.stock,
        marcaSeleccionada: marcaSeleccionada.nombreMarca,
        id: Date.now(),
      };
      cart.set([...cartItems, nuevoItem]);
    }

    localStorage.setItem("cart", JSON.stringify(cart.get()));
  } catch (error: any) {
    const mensaje =
      error.response?.data?.message || error.message || "Error desconocido";
    errorAddCart.set(mensaje);
    console.error("Error al añadir al carrito:", mensaje);
    throw new Error(mensaje);
  } finally {
    loadingAddCart.set(false);
  }
};
const updateMarca = (productId: number, oldMarca: string, newMarca: string) => {
  cart.set(
    cart
      .get()
      .map((item) =>
        item.productId === productId && item.marcaSeleccionada === oldMarca
          ? { ...item, marcaSeleccionada: newMarca }
          : item
      )
  );
};

export const removeFromCart = (
  productId: number,
  marcaSeleccionada: string
) => {
  const currentCart = cart.get();
  const updatedCart = currentCart.filter(
    (item) =>
      !(
        item.productId === productId &&
        item.marcaSeleccionada === marcaSeleccionada
      )
  );
  cart.set(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const increaseQty = (productId: number, marcaSeleccionada: string) => {
  const cartItems = cart.get();
  const updatedCart = cartItems.map((item) =>
    item.productId === productId && item.marcaSeleccionada === marcaSeleccionada
      ? { ...item, qty: item.qty + 1 }
      : item
  );
  cart.set(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const decreaseQty = (productId: number, marcaSeleccionada: string) => {
  const cartItems = cart.get();
  const updatedCart = cartItems.map((item) =>
    item.productId === productId && item.marcaSeleccionada === marcaSeleccionada
      ? { ...item, qty: Math.max(item.qty - 1, 1) }
      : item
  );
  cart.set(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const useCart = () => {
  const $cart = useStore(cart);
  return {
    cart: $cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    updateMarca,
  };
};
