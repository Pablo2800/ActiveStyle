package eCommerce.Api.Entitys;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CrearProductoRequest {
    private Producto producto;
    private Map<String, Integer> talles;

    // Getters y setters

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Map<String, Integer> getTalles() {
        return talles;
    }

    public void setTalles(Map<String, Integer> talles) {
        this.talles = talles;
    }
}

