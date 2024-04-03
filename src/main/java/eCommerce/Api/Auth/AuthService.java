package eCommerce.Api.Auth;

import eCommerce.Api.Entitys.Role;
import eCommerce.Api.Entitys.Usuario.Usuario;
import eCommerce.Api.Jwt.JwtService;
import eCommerce.Api.Login.LoginRequest;
import eCommerce.Api.RegisterRequest.AdminRegisterRequest;
import eCommerce.Api.RegisterRequest.RegisterRequest;
import eCommerce.Api.Repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuthService {
        private final UsuarioRepository usuarioRepository;
        private final JwtService jwtService;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        public AuthResponse login(LoginRequest request) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            UserDetails usuario = usuarioRepository.findByUsername(request.getUsername()).orElseThrow();
            String token= jwtService.getToken(usuario);
            return AuthResponse.builder()
                    .token(token)
                    .build();
        }

        public AuthResponse register(RegisterRequest request) {
            Usuario usuario = Usuario.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .country(request.getCountry())
                    .role(Role.USUARIO) // Establecer el rol como usuario normal
                    .build();

            usuarioRepository.save(usuario);

            return AuthResponse.builder()
                    .token(jwtService.getToken(usuario))
                    .build();
        }
    public AuthResponse registerAdmin(AdminRegisterRequest request) {
        Usuario usuario = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .country(request.getCountry())
                .role(Role.ADMIN) // Establecer el rol como administrador
                .build();

        usuarioRepository.save(usuario);

        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .build();
    }
    }

