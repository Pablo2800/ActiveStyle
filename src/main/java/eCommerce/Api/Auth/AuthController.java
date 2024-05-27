package eCommerce.Api.Auth;

import eCommerce.Api.Jwt.JwtService;
import eCommerce.Api.Login.LoginRequest;
import eCommerce.Api.RegisterRequest.AdminRegisterRequest;
import eCommerce.Api.RegisterRequest.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtService.getToken(userDetails);

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<AuthResponseRegister> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping("/admin/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AuthResponseRegister> registerAdmin(@RequestBody AdminRegisterRequest request) {
        // Lógica para registrar un nuevo administrador
        return ResponseEntity.ok(authService.registerAdmin(request));
    }
}