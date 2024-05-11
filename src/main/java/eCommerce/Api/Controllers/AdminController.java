package eCommerce.Api.Controllers;

import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/activeStyle/admin")
public class AdminController {

    @Autowired
    private ProductoService productoService;


    @GetMapping("/getProductos")
    public ResponseEntity<?> findAllProductos() {
        try {
            List<Producto> productos = productoService.findAllProductos();
            return new ResponseEntity<>(productos, HttpStatus.OK);
        } catch (Exception e) {
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
    public ResponseEntity<?> findByIdProducto(@PathVariable Long id) {
        try {
            Optional<Producto> producto = productoService.obtenerProducto(id);
            return new ResponseEntity<>(producto, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("No se encontró ningún producto con el Id igual a " + id);
        }
    }

    @PostMapping("/crearProducto")
    public ResponseEntity<?> crearProducto(
            @ModelAttribute Producto producto,
            @RequestParam("imagen") List<MultipartFile> imagen,
            @RequestParam("talles") int[] talles) {
        try {
            Producto productoCreado = productoService.createProducto(producto, imagen, talles);
            return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el producto: " + e.getMessage());
        }
    }
    @GetMapping("/buscarPorTalle")
    public ResponseEntity<List<Producto>> buscarProductosPorTalle(@RequestParam int talle) {
        try {
            List<Producto> productos = productoService.buscarPorTalle(talle);
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/producto/{id}")
    public ResponseEntity<?> updateProducto(@PathVariable Long id){
        try {
            Producto productoActualizar = productoService.updatePorducto(id);
            return new ResponseEntity<>(productoActualizar, HttpStatus.OK);
        }catch (Exception e){
            throw new RuntimeException("No se encontró un Producto con el ID "+ id +" para actualizar");
        }
    }
    @DeleteMapping("/producto/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id){
        try {
            productoService.deleteProducto(id);
            return ResponseEntity.noContent().build();
        }catch (Exception e){
            throw new RuntimeException("No se encontró un producto con el ID "+id+ " ingresado, vuelva a intentar.");
        }
    }

}
