package com.store.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "producto_marca")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ProductoMarca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;

    private int stock;
}