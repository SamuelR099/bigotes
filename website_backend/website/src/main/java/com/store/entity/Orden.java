package com.store.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "ordenes")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private LocalDateTime fecha;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private BigDecimal total;

    public enum Estado {
        PENDIENTE, ENVIADO, ENTREGADO
    }
}