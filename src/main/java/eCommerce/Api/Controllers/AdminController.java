package eCommerce.Api.Controllers;

import eCommerce.Api.Entitys.Categoria;
import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Services.CategoriaService;
import eCommerce.Api.Services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/activeStyle/admin")
public class AdminController {

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

    @GetMapping("/categoria/{id}")
    public ResponseEntity<?> findByIdCategoria(@PathVariable Long id) {
        try {
            Categoria categoria = categoriaService.findByIdCategoria(id);
            return new ResponseEntity<>(categoria, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró una categoria con el id igual a " + id);
        }
    }

    @PostMapping("/create/categoria")
    public ResponseEntity<?> createCategoria(@RequestBody Categoria categoria) {
        try {
            Categoria nuevaCategoria = categoriaService.createCategoria(categoria);
            return new ResponseEntity<>(nuevaCategoria, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("No se pudo crear la categoría: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/categoria/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
        try {
            Categoria categoriaExistente = categoriaService.updateCategoria(id, categoria);
            return new ResponseEntity<>(categoriaExistente, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/categoria/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        try {
            categoriaService.deleteCategoria(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
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
    public ResponseEntity<?> findByIdProducto(@PathVariable Long id) {
        try {
            Producto producto = productoService.findByIdProducto(id);
            return new ResponseEntity<>(producto, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("No se encontró ningún producto con el Id igual a " + id);
        }
    }
    @PostMapping("/crear/producto")
    public ResponseEntity<?> crearProductoProducto(@RequestBody Producto producto, @RequestParam List<Long> categoriaIds, @RequestParam int[] talles) {
        try {
            Producto nuevoProducto = productoService.createProducto(producto, categoriaIds, talles);
            return ResponseEntity.ok(nuevoProducto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
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
