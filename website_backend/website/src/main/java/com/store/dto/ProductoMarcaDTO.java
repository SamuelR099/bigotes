package com.store.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ProductoMarcaDTO {
    private Long idMarca;
    private String nombreMarca;
    private int stock;
}