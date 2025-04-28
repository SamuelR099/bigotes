export async function obtenerProductoPorId(id) {
  try {
    const respuesta = await fetch(`http://localhost:8080/productos`);
    if (!respuesta.ok) {
      throw new Error("Error al obtener el producto");
    }
    return await respuesta.json();
  } catch (error) {
    console.error("❌ Error:", error);
    return null;
  }
}
