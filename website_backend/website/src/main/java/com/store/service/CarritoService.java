package com.store.service;

import com.store.dto.CarritoDTO;
import com.store.dto.CarritoItemDTO;
import com.store.entity.Carrito;
import com.store.entity.CarritoItem;
import com.store.entity.Usuario;
import com.store.repository.CarritoRepository;
import com.store.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public CarritoDTO obtenerCarritoUsuario(Long usuarioId) {
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseGet(() -> {
                    Usuario usuario = usuarioRepository.findById(usuarioId)
                            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                    Carrito nuevoCarrito = new Carrito();
                    nuevoCarrito.setUsuario(usuario);
                    nuevoCarrito.setProductos(new ArrayList<>());
                    return carritoRepository.save(nuevoCarrito);
                });

        return convertirACarritoDTO(carrito);
    }

    public CarritoDTO agregarProducto(Long usuarioId, Long productoId, int cantidad) {
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        Optional<CarritoItem> existente = carrito.getProductos().stream()
                .filter(item -> item.getProductoId().equals(productoId))
                .findFirst();

        if (existente.isPresent()) {
            CarritoItem item = existente.get();
            item.setCantidad(item.getCantidad() + cantidad);
        } else {
            CarritoItem nuevoItem = new CarritoItem(productoId, cantidad);
            carrito.getProductos().add(nuevoItem);
        }

        Carrito carritoActualizado = carritoRepository.save(carrito);
        return convertirACarritoDTO(carritoActualizado);
    }

    public CarritoDTO eliminarProducto(Long usuarioId, Long productoId) {
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        carrito.getProductos().removeIf(item -> item.getProductoId().equals(productoId));

        Carrito carritoActualizado = carritoRepository.save(carrito);
        return convertirACarritoDTO(carritoActualizado);
    }

    public void eliminarCarrito(Long usuarioId) {
        carritoRepository.findByUsuarioId(usuarioId).ifPresent(carritoRepository::delete);
    }

    private CarritoDTO convertirACarritoDTO(Carrito carrito) {
        List<CarritoItemDTO> productosDTO = carrito.getProductos().stream()
                .map(item -> new CarritoItemDTO(item.getProductoId(), item.getCantidad()))
                .toList();

        return new CarritoDTO(
                carrito.getId(),
                carrito.getUsuario().getId(),
                productosDTO
        );
    }
}
