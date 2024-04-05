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
            if (!isValidRequest(request)) {
                // Aquí puedes lanzar una excepción, registrar un error, o manejar la situación según lo necesites
                throw new IllegalArgumentException("Los datos proporcionados no son del tipo correcto");
            }
            Usuario usuario = Usuario.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .country(request.getCountry())
                    .dni(request.getDni())
                    .cellphone(request.getCellphone())
                    .department(request.getDepartment())
                    .direction(request.getDirection())
                    .direction_number(request.getDirection_number())
                    .floor_number(request.getFloor_number() != null ? request.getFloor_number() : null)
                    .email(request.getEmail())
                    .role(Role.USUARIO) // Establecer el rol como usuario normal
                    .build();

            usuarioRepository.save(usuario);

            return AuthResponse.builder()
                    .token(jwtService.getToken(usuario))
                    .build();
        }

    private boolean isValidRequest(RegisterRequest request) {
        Long dni = request.getDni();
        if (dni == null || String.valueOf(dni).length() != 8) {
            throw new IllegalArgumentException("El número de piso debe ser un número de 8 dígitos");
        }
        Long cellphone = request.getCellphone();
        int cellphoneLength = String.valueOf(cellphone).length();
        if (cellphone == null || cellphoneLength < 10 || cellphoneLength > 13) {
            throw new IllegalArgumentException("El número de teléfono celular debe ser un número entre 10 y 13 dígitos");
        }
         if (request.getUsername() == null || request.getUsername().isEmpty()) {
            throw new IllegalArgumentException("El nombre de usuario es obligatorio");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }
        if (request.getFirstname() == null || request.getFirstname().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (request.getLastname() == null || request.getLastname().isEmpty()) {
            throw new IllegalArgumentException("El apellido es obligatorio");
        }
        if (request.getCountry() == null || request.getCountry().isEmpty()) {
            throw new IllegalArgumentException("El país es obligatorio");
        }
        if (request.getDepartment() == null || request.getDepartment().isEmpty()) {
            throw new IllegalArgumentException("El departamento es obligatorio");
        }
        if (request.getDirection() == null || request.getDirection().isEmpty()) {
            throw new IllegalArgumentException("La dirección es obligatoria");
        }
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new IllegalArgumentException("El correo electrónico es obligatorio");
        }
        return true;
    }

    public AuthResponse registerAdmin(AdminRegisterRequest request) {
        Usuario usuario = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .country(request.getCountry())
                .dni(request.getDni())
                .cellphone(request.getCellphone())
                .department(request.getDepartment())
                .direction(request.getDirection())
                .direction_number(request.getDirection_number())
                .floor_number(request.getFloor_number())
                .email(request.getEmail())
                .role(Role.ADMIN) // Establecer el rol como administrador
                .build();

        usuarioRepository.save(usuario);

        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .build();
    }
    }

