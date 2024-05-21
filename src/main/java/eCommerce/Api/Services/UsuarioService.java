package eCommerce.Api.Services;

import eCommerce.Api.Entitys.Role;
import eCommerce.Api.Entitys.Usuario.Usuario;
import eCommerce.Api.Entitys.Usuario.UsuarioDTO;
import eCommerce.Api.Entitys.Usuario.UsuarioRequest;
import eCommerce.Api.Entitys.Usuario.UsuarioResponse;
import eCommerce.Api.Repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    public UsuarioResponse updateUsuario(Long id, UsuarioRequest usuarioRequest) {
        Optional<Usuario> existingUsuarioOpt = usuarioRepository.findById(id);
        if (!existingUsuarioOpt.isPresent()) {
            return new UsuarioResponse("El usuario no existe");
        }

        Usuario existingUsuario = existingUsuarioOpt.get();

        if (usuarioRequest.getFirstname() != null) {
            existingUsuario.setFirstname(usuarioRequest.getFirstname());
        }
        if (usuarioRequest.getLastname() != null) {
            existingUsuario.setLastname(usuarioRequest.getLastname());
        }
        // Ignoramos usuarioRequest.getUsername() para que no se pueda actualizar
        if (usuarioRequest.getDni() != null) {
            existingUsuario.setDni(usuarioRequest.getDni());
        }
        if (usuarioRequest.getCellphone() != null) {
            existingUsuario.setCellphone(usuarioRequest.getCellphone());
        }
        if (usuarioRequest.getAddress() != null) {
            existingUsuario.setAddress(usuarioRequest.getAddress());
        }
        if (usuarioRequest.getEmail() != null) {
            existingUsuario.setEmail(usuarioRequest.getEmail());
        }
        // No actualizamos el rol aquí si no es necesario

        usuarioRepository.save(existingUsuario);

        return new UsuarioResponse("El usuario se modificó satisfactoriamente");
    }
    public UsuarioDTO getUsuario(Long id){
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if(usuario !=null){
            UsuarioDTO usuarioDTO = UsuarioDTO.builder()
                    .id(usuario.getId())
                    .firstname(usuario.getFirstname())
                    .lastname(usuario.getLastname())
                    .username(usuario.getUsername())
                    .dni(usuario.getDni())
                    .cellphone(usuario.getCellphone())
                    .address(usuario.getAddress())
                    .email(usuario.getEmail())
                    .build();
            return usuarioDTO;
        }
        return null;
    }
    public List<UsuarioDTO> getAllUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(usuario -> UsuarioDTO.builder()
                        .id(usuario.getId())
                        .firstname(usuario.getFirstname())
                        .lastname(usuario.getLastname())
                        .username(usuario.getUsername())
                        .dni(usuario.getDni())
                        .cellphone(usuario.getCellphone())
                        .address(usuario.getAddress())
                        .email(usuario.getEmail())
                        .build())
                .collect(Collectors.toList());
    }
    public boolean deleteUsuario(Long id) {
        // Verificar si el usuario existe
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            // Si el usuario existe, eliminarlo
            usuarioRepository.deleteById(id);
            return true; // Indica que la eliminación fue exitosa
        } else {
            // Si el usuario no existe, no se puede eliminar
            return false; // Indica que no se pudo eliminar el usuario
        }
    }

}
