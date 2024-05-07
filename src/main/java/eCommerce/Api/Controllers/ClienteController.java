package eCommerce.Api.Controllers;


import eCommerce.Api.Entitys.Categoria;
import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Services.CategoriaService;
import eCommerce.Api.Services.ProductoService;
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
    private CategoriaService categoriaService;
    @Autowired
    private ProductoService productoService;


    @GetMapping("/getCategorias")
    public ResponseEntity<?> findAllCategorias() {
        try {
            List<Categoria> categorias = categoriaService.findAllCategorias();
            if (categorias.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron Categorias para mostrar en pantalla");
            }
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error en el servidor, porfavor vuelva a intentar");
        }
    }
    @GetMapping("/productos/categoria/{categoriaId}")
    public List<Producto> getProductosPorCategoria(@PathVariable Long categoriaId) {
        return productoService.buscarProductosPorCategoria(categoriaId);
    }
    @GetMapping("/producto/buscarPorTalle")
    public ResponseEntity<List<Producto>> buscarProductosPorTalle(@RequestParam int talle) {
        try {
            List<Producto> productos = productoService.buscarPorTalle(talle);
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/categoria/{id}")
    public ResponseEntity<?> findByIdCategoria(@PathVariable Long id) {
        try {
            Categoria categoria = categoriaService.findByIdCategoria(id);
            return new ResponseEntity<>(categoria, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró una categoria con el id igual a " + id);
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
    @GetMapping("/producto/{id}")
    public ResponseEntity<?> findByIdProducto(@PathVariable Long id){
        try {
            Optional<Producto> producto = productoService.obtenerProducto(id);
            return new ResponseEntity<>(producto, HttpStatus.OK);
        }catch (Exception e){
            throw new RuntimeException("No se encontró ningún producto con el Id igual a "+id);
        }
    }
    //http://tudominio.com/productos?nameProduct=nombre_del_producto
    @GetMapping("/productos")
    public List<Producto> searchProductosByName(@RequestParam("nameProduct") String nameProduct) {
        return productoService.searchProductosByName(nameProduct);
    }
}
