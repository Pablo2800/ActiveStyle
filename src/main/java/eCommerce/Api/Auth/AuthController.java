package eCommerce.Api.Auth;

import eCommerce.Api.Jwt.JwtService;
import eCommerce.Api.Login.LoginRequest;
import eCommerce.Api.RegisterRequest.AdminRegisterRequest;
import eCommerce.Api.RegisterRequest.RegisterRequest;
import eCommerce.Api.Services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseLogin> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }
    @PostMapping("/register")
    public ResponseEntity<AuthResponseRegister> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping("/admin/register")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<AuthResponseRegister> registerAdmin(@RequestBody AdminRegisterRequest request) {
        // Verifica si ya hay al menos un administrador en el sistema
        if (usuarioService.isFirstAdmin()) {
            // Si es el primer administrador, lo permitimos sin validación de rol
            return ResponseEntity.ok(authService.registerAdmin(request));
        } else {
            // Si ya existe un administrador, restringir la creación a solo administradores
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ADMIN"))) {
                // Si el usuario autenticado tiene el rol ADMIN, permitimos la creación de un nuevo ADMIN
                return ResponseEntity.ok(authService.registerAdmin(request));
            } else {
                // Si el usuario no tiene rol ADMIN, lo bloqueamos
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponseRegister("No tienes permisos para crear un administrador"));
            }
        }
    }
}