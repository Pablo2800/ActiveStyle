package eCommerce.Api.Entitys;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameProduct;
    private String description;
    private double price;
    private String marca;
    private int stock;
    private boolean discount;
    private int porcentaje;
    private String indumentaria;
    private String genero;
    private String actividad;
    @ElementCollection
    @CollectionTable(name = "producto_talles", joinColumns = @JoinColumn(name = "producto_id"))
    @Column(name = "talle")
    private String[] talles;
    @ElementCollection
    @CollectionTable(name = "producto_images", joinColumns = @JoinColumn(name = "producto_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;
}
