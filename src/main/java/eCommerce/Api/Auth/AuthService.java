package eCommerce.Api.Auth;

import eCommerce.Api.Entitys.CarritoCompras;
import eCommerce.Api.Entitys.Role;
import eCommerce.Api.Entitys.Usuario.Usuario;
import eCommerce.Api.Jwt.JwtService;
import eCommerce.Api.Login.LoginRequest;
import eCommerce.Api.RegisterRequest.AdminRegisterRequest;
import eCommerce.Api.RegisterRequest.RegisterRequest;
import eCommerce.Api.Repositories.CarritoComprasRepository;
import eCommerce.Api.Repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
        private final UsuarioRepository usuarioRepository;
        private final JwtService jwtService;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final CarritoComprasRepository carritoComprasRepository;
        @Transactional
        public AuthResponseLogin login(LoginRequest request) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            Usuario usuario = usuarioRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
            String username = usuario.getUsername();
            String firstname = usuario.getFirstname(); // Suponiendo que UserDetails no tiene un método getFirstname() y que User es la clase que implementa UserDetails y tiene un método getFirstname()
            String lastname = usuario.getLastname(); // Suponiendo lo mismo para el apellido
            String address = usuario.getAddress();
            String email = usuario.getEmail();
            Long cellphone = usuario.getCellphone();
            Long dni = usuario.getDni();
            Role role = usuario.getRole();
            String token= jwtService.getToken(usuario);
            return AuthResponseLogin.builder()
                    .username(username)
                    .firstname(firstname)
                    .lastname(lastname)
                    .address(address)
                    .email(email)
                    .cellphone(cellphone)
                    .dni(dni)
                    .role(role)
                    .token(token)
                    .build();
        }

        public AuthResponseRegister register(RegisterRequest request) {
            if (!isValidRequest(request)) {
                // Aquí puedes lanzar una excepción, registrar un error, o manejar la situación según lo necesites
                throw new IllegalArgumentException("Los datos proporcionados no son del tipo correcto");
            }
            Usuario usuario = Usuario.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .dni(request.getDni())
                    .cellphone(request.getCellphone())
                    .address(request.getAddress())
                    .email(request.getEmail())
                    .role(Role.USER) // Establecer el rol como usuario normal
                    .build();
            usuarioRepository.save(usuario);
            CarritoCompras carritoCompras = new CarritoCompras();
            carritoCompras.setUsuario(usuario);

            // Guardar el carrito de compras
            CarritoCompras savedCarritoCompras = carritoComprasRepository.save(carritoCompras);

            // Asociar el carrito de compras con el cliente y actualizar el cliente
            usuario.setCarritoCompras(savedCarritoCompras);
            usuarioRepository.save(usuario);  // Actualizar el cliente con el carrito de compras


            return AuthResponseRegister.builder()
                    .token(jwtService.getToken(usuario))
                    .build();
        }

    private boolean isValidRequest(RegisterRequest request) {
        Long dni = request.getDni();
        if (dni == null || String.valueOf(dni).length() != 8) {
            throw new IllegalArgumentException("El número de dni debe ser un número de 8 dígitos en total");
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
        if (request.getAddress() == null || request.getAddress().isEmpty()) {
            throw new IllegalArgumentException("La dirección es obligatoria");
        }
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new IllegalArgumentException("El correo electrónico es obligatorio");
        }
        return true;
    }

    public AuthResponseRegister registerAdmin(AdminRegisterRequest request) {
        Usuario usuario = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .dni(request.getDni())
                .cellphone(request.getCellphone())
                .address(request.getAddress())
                .email(request.getEmail())
                .role(Role.ADMIN) // Establecer el rol como administrador
                .build();

        usuarioRepository.save(usuario);

        return AuthResponseRegister.builder()
                .token(jwtService.getToken(usuario))
                .build();
    }
    }

