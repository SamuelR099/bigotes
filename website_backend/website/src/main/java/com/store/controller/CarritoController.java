package com.store.controller;

import com.store.dto.CarritoDTO;
import com.store.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @GetMapping("/{usuarioId}")
    public CarritoDTO obtenerCarrito(@PathVariable Long usuarioId) {
        return carritoService.obtenerCarritoUsuario(usuarioId);
    }

    @PostMapping("/agregar")
    public CarritoDTO agregarProducto(
            @RequestParam Long usuarioId,
            @RequestParam Long productoId,
            @RequestParam(defaultValue = "1") int cantidad
    ) {
        return carritoService.agregarProducto(usuarioId, productoId, cantidad);
    }

    @DeleteMapping("/eliminar")
    public CarritoDTO eliminarProducto(
            @RequestParam Long usuarioId,
            @RequestParam Long productoId
    ) {
        return carritoService.eliminarProducto(usuarioId, productoId);
    }

    @DeleteMapping("/vaciar/{usuarioId}")
    public void vaciarCarrito(@PathVariable Long usuarioId) {
        carritoService.eliminarCarrito(usuarioId);
    }
}
