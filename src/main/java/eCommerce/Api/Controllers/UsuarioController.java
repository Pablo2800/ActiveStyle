package eCommerce.Api.Controllers;

import eCommerce.Api.Entitys.Usuario.UsuarioDTO;
import eCommerce.Api.Entitys.Usuario.UsuarioRequest;
import eCommerce.Api.Entitys.Usuario.UsuarioResponse;
import eCommerce.Api.Services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value= "/api/v1/usuario")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UsuarioController{
    private final UsuarioService usuarioService;

    @GetMapping(value = "{id}")
    public ResponseEntity<UsuarioDTO> getUsuario(@PathVariable Long id){
        UsuarioDTO usuarioDTO = usuarioService.getUsuario(id);
        if(usuarioDTO==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioDTO);
    }

    @PutMapping()
    public ResponseEntity<UsuarioResponse> updateUsuario(@RequestBody UsuarioRequest usuarioRequest){
        return ResponseEntity.ok(usuarioService.updateUsuario(usuarioRequest));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        // Llama al servicio para eliminar el usuario por su ID
        boolean deleted = usuarioService.deleteUsuario(id);
        if (deleted) {
            // Si se eliminó correctamente, devuelve un ResponseEntity con estado 204 No Content
            return ResponseEntity.noContent().build();
        } else {
            // Si no se encontró el usuario, devuelve un ResponseEntity con estado 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }
}
