package com.store.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "marcas")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    
    @OneToMany(mappedBy = "marca", cascade = CascadeType.ALL)
    private List<ProductoMarca> productoMarcas;
}
