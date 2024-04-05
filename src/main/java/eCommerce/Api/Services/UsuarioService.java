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
                .adress(usuarioRequest.getAdress())
                .email(usuarioRequest.getEmail())
                .role(Role.USUARIO)
                .build();
        usuarioRepository.updateUsuario(usuario.getId(), usuario.getFirstname(), usuario.getLastname(),usuario.getDni(), usuario.getCellphone(),  usuario.getAdress(), usuario.getEmail());
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
                    .adress(usuario.getAdress())
                    .email(usuario.getEmail())
                    .build();
            return usuarioDTO;
        }
        return null;
    }

}
