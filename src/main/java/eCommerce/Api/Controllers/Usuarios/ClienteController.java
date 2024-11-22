package eCommerce.Api.Controllers.Usuarios;


import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Entitys.Usuario.UsuarioRequest;
import eCommerce.Api.Entitys.Usuario.UsuarioResponse;
import eCommerce.Api.Services.ProductoService;
import eCommerce.Api.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/activeStyle/cliente")
public class ClienteController {

    @Autowired
    private ProductoService productoService;
    @Autowired
    private UsuarioService usuarioService;


    @GetMapping("/producto/buscarPorTalle")
    public ResponseEntity<List<Producto>> buscarProductosPorTalle(@RequestParam String talle) {
        try {
            List<Producto> productos = productoService.buscarPorTalle(talle);
            if (productos.isEmpty()) {
                throw new Exception("No se encontraron productos con el talle: " + talle);
            }
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/getProductos")
    public ResponseEntity<?> findAllProductos(){
        try {
            List<Producto> productos = productoService.findAllProductos();
            return new ResponseEntity<>(productos, HttpStatus.OK);
        }catch (Exception e){
            throw new RuntimeException("No se encontraron productos para mostrar en pantalla");
        }
    }
    @GetMapping("/buscarProducto")
    public List<Producto> buscarProductosPorNombre(@RequestParam String nombre) {
        return productoService.buscarProductosPorNombre(nombre);
    }
    @GetMapping("/buscarPorIndumentaria")
    public List<Producto> buscarProductosPorIndumentaria(@RequestParam String indumentaria) {
        return productoService.buscarProductosPorIndumentaria(indumentaria);
    }
    @GetMapping("/buscarPorActividad")
    public List<Producto> buscarProductosPorActividad(@RequestParam String actividad) {
        return productoService.buscarProductosPorActividad(actividad);
    }
    @GetMapping("/buscarPorGenero")
    public List<Producto> buscarProductosPorGenero(@RequestParam String genero) {
        return productoService.buscarProductosPorGenero(genero);
    }
    @GetMapping("/buscarPorMarca")
    public List<Producto> buscarProductoPorMarca(@RequestParam String marca) {
        return productoService.buscarProductoPorMarca(marca);
    }
    @GetMapping("/producto/{id}")
    public ResponseEntity<?> findByIdProducto(@PathVariable Long id){
        try {
            Optional<Producto> producto = productoService.obtenerProducto(id);
            return new ResponseEntity<>(producto, HttpStatus.OK);
        }catch (Exception e){
            throw new RuntimeException("No se encontró ningún producto con el Id igual a "+id);
        }
    }
    @GetMapping("/productos")
    public List<Producto> searchProductosByName(@RequestParam("nameProduct") String nameProduct) {
        return productoService.searchProductosByName(nameProduct);
    }
    @PutMapping("/updateUsuario/{id}")
    public ResponseEntity<UsuarioResponse> updateUsuario(@PathVariable Long id, @RequestBody UsuarioRequest usuarioRequest) {
        UsuarioResponse response = usuarioService.updateUsuario(id, usuarioRequest);
        return ResponseEntity.ok(response);
    }
}