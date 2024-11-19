package eCommerce.Api.Entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import eCommerce.Api.Entitys.Usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "carrito_compras")
public class CarritoCompras {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "carritoCompras")
    @JsonIgnore
    private Usuario usuario;

    @OneToMany(mappedBy = "carritoCompras", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemCarrito> ItemCarritos;
}