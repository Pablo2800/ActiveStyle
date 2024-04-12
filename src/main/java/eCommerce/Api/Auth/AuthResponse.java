package eCommerce.Api.Auth;

import eCommerce.Api.Entitys.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    String username;
    String password;
    String firstname;
    String lastname;
    String address;
    String email;
    Long cellphone;
    Long dni;
    Role role;
    String token;
}
