package eCommerce.Api.Auth;

import eCommerce.Api.Entitys.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseLogin {
    String username;
    String firstname;
    String lastname;
    String address;
    String email;
    Long cellphone;
    Long dni;
    Role role;
    String token;
}
