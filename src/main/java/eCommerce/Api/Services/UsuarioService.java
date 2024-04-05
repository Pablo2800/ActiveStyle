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

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    @Transactional
    public UsuarioResponse updateUsuario(UsuarioRequest usuarioRequest){
        Usuario usuario = Usuario.builder()
                .id(usuarioRequest.getId())
                .firstname(usuarioRequest.getFirstname())
                .lastname(usuarioRequest.getLastname())
                .username(usuarioRequest.getUsername())
                .dni(usuarioRequest.getDni())
                .cellphone(usuarioRequest.getCellphone())
                .address(usuarioRequest.getAddress())
                .email(usuarioRequest.getEmail())
                .role(Role.USUARIO)
                .build();
        usuarioRepository.updateUsuario(usuario.getId(), usuario.getFirstname(), usuario.getLastname(),usuario.getDni(), usuario.getCellphone(),  usuario.getAddress(), usuario.getEmail());
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
