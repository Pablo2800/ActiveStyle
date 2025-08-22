package eCommerce.Api.DTOs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class DTOProducto {
    private String nameProduct;
    private String description;
    private double price;
    private String marca;
    private boolean discount;
    private int porcentaje;
    private String indumentaria;
    private String genero;
    private String actividad;
    private String talles;
    private List<MultipartFile> imagen;
    public Map<String, Integer> getTalles() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(talles, new TypeReference<Map<String, Integer>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al procesar talles: " + e.getMessage());
        }
    }
}
