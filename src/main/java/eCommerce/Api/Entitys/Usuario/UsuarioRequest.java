package eCommerce.Api.Entitys.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequest {
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String country;
    private String direction;
    private String department;
    private int direction_number;
    private String floor_number;
    private String email;
    private Long cellphone;
    private Long dni;
}
