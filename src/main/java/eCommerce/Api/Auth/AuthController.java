package eCommerce.Api.Auth;

import eCommerce.Api.Entitys.Enums.Role;
import eCommerce.Api.Login.LoginRequest;
import eCommerce.Api.RegisterRequest.AdminRegisterRequest;
import eCommerce.Api.RegisterRequest.RegisterRequest;
import eCommerce.Api.Services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<AuthResponseRegister> registerAdmin(@RequestBody AdminRegisterRequest request) {
        // Verifica si ya hay al menos un administrador en el sistema
        if (usuarioService.isFirstAdmin()) {
            // Si es el primer administrador, lo permitimos sin validación de rol
            return ResponseEntity.ok(authService.registerAdmin(request));
        } else {
            // Si ya existe un administrador, se requiere que el usuario autenticado tenga el rol ADMIN
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Verificar si el usuario está autenticado y tiene el rol ADMIN
            if (authentication != null && authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals(Role.ADMIN.getRoleName()))) {
                // Si el usuario tiene el rol ADMIN, permitimos la creación de un nuevo ADMIN
                return ResponseEntity.ok(authService.registerAdmin(request));
            } else {
                // Si el usuario no tiene rol ADMIN, lo bloqueamos
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponseRegister("No tienes permisos para crear un administrador"));
            }
        }
    }
}