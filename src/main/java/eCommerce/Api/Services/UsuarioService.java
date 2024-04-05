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
                .country(usuarioRequest.getCountry())
                .floor_number(usuarioRequest.getFloor_number())
                .direction_number(usuarioRequest.getDirection_number())
                .dni(usuarioRequest.getDni())
                .cellphone(usuarioRequest.getCellphone())
                .department(usuarioRequest.getDepartment())
                .direction(usuarioRequest.getDirection())
                .email(usuarioRequest.getEmail())
                .role(Role.USUARIO)
                .build();
        usuarioRepository.updateUsuario(usuario.getId(), usuario.getFirstname(), usuario.getLastname(), usuario.getCountry(), usuario.getFloor_number(), usuario.getDirection_number(),usuario.getDni(), usuario.getCellphone(), usuario.getDepartment(), usuario.getDirection(), usuario.getEmail());
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
                    .country(usuario.getCountry())
                    .floor_number(usuario.getFloor_number())
                    .direction_number(usuario.getDirection_number())
                    .dni(usuario.getDni())
                    .cellphone(usuario.getCellphone())
                    .department(usuario.getDepartment())
                    .direction(usuario.getDirection())
                    .email(usuario.getEmail())
                    .build();
            return usuarioDTO;
        }
        return null;
    }

}
