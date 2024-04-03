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
    private String firstname;
    private String lastname;
    private String country;
    private String username;
}
