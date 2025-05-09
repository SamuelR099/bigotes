// state/product.ts

export interface Marca {
  idMarca: number;
  nombreMarca: string;
  stock: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
  marcas: Marca[];
}

/**
 * Obtiene un producto por su ID desde el backend
 * @param id El ID del producto
 * @returns Objeto Producto o undefined en caso de error
 */
export async function getProductRequest(
  id: string
): Promise<Producto | undefined> {
  try {
    const res = await fetch(`http://localhost:8080/productos/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    const producto: Producto = await res.json();
    return producto;
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error);
    return undefined;
  }
}

/**
 * Obtiene todos los productos desde el backend
 * @returns Lista de productos o array vacío en caso de error
 */
export async function getAllProducts(): Promise<Producto[]> {
  try {
    const res = await fetch("http://localhost:8080/productos");
    if (!res.ok) throw new Error("Error al obtener los productos");
    const productos: Producto[] = await res.json();
    return productos;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
}
