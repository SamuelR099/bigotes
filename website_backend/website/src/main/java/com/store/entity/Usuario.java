package com.store.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "usuarios")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private String correo;

    private String contraseña;

    private String direccion;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    public enum Rol {
        CLIENTE, ADMIN
    }
}
