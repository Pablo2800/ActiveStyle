package eCommerce.Api.Entitys;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

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
    private byte[] image;
    private double price;
    private String marca;
    private int stock;
    private boolean discount;
    private int porcentaje;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "categoria_producto",
            joinColumns = @JoinColumn(name = "producto_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id"))
    @Fetch(FetchMode.JOIN)
    private Set<Categoria> categorias = new HashSet<>();
    @ElementCollection
    @CollectionTable(name = "producto_talles", joinColumns = @JoinColumn(name = "producto_id"))
    @Column(name = "talle")
    private int[] talles;
}
