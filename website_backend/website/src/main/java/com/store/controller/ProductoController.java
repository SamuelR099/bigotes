package com.store.controller;

import com.store.dto.ProductoMarcaDTO;
import com.store.dto.ProductoDTO;
import com.store.entity.Producto;
import com.store.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:4321") // Para permitir peticiones del frontend
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // 📌 Obtener todos los productos
    @GetMapping
    public List<ProductoDTO> getAllProductos() {
        return productoService.getAllProductos()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 📌 Obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> getProductoById(@PathVariable Long id) {
        Optional<Producto> producto = productoService.getProductoById(id);
        return producto.map(p -> ResponseEntity.ok(convertToDto(p)))
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 📌 Crear un nuevo producto
    @PostMapping
    public ResponseEntity<ProductoDTO> createProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.createProducto(producto);
        return ResponseEntity.ok(convertToDto(nuevoProducto));
    }

    // 📌 Actualizar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        Optional<Producto> updatedProducto = productoService.updateProducto(id, producto);
        return updatedProducto.map(p -> ResponseEntity.ok(convertToDto(p)))
                              .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 📌 Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        boolean eliminado = productoService.deleteProducto(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    private ProductoDTO convertToDto(Producto producto) {
        List<ProductoMarcaDTO> marcasDto = producto.getProductoMarcas().stream()
            .map(pm -> new ProductoMarcaDTO(pm.getMarca().getId(), pm.getMarca().getNombre(), pm.getStock()))
            .collect(Collectors.toList());
    
        return new ProductoDTO(
            producto.getId(),
            producto.getNombre(),
            producto.getDescripcion(),
            producto.getPrecio(),
            // este podrías ignorarlo si ya lo manejas por marca
            producto.getImagenes(),
            marcasDto
        );
    }  }