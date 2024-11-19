package eCommerce.Api.Entitys;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProductoUpdateRequest {
    private String nombre;
    private String descripcion;
    private Double precio;
    private String marca;
    private Integer stock;
    private Boolean discount;
    private Integer porcentaje;
    private String indumentaria;
    private String genero;
    private String actividad;
    private Map<String, Integer> talles;
    private List<String> imageUrls;
}
