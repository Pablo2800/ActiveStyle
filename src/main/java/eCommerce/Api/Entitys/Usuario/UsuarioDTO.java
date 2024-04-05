package eCommerce.Api.Entitys.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsuarioDTO {
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String adress;
    private String email;
    private Long cellphone;
    private Long dni;
}