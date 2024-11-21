package eCommerce.Api.Controllers.Admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import eCommerce.Api.DTOs.DTOProducto;
import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.DTOs.ProductoUpdateRequest;
import eCommerce.Api.Entitys.Usuario.UsuarioDTO;
import eCommerce.Api.Entitys.Usuario.UsuarioRequest;
import eCommerce.Api.Entitys.Usuario.UsuarioResponse;
import eCommerce.Api.Services.ProductoService;
import eCommerce.Api.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/activeStyle/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    @Autowired
    private ProductoService productoService;
    @Autowired
    private UsuarioService usuarioService;

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
            @RequestHeader(name = "Authorization", required = true) String token,
            @ModelAttribute DTOProducto productoDTO,
            @RequestParam("talles") String tallesJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Integer> talles = mapper.readValue(tallesJson, new TypeReference<Map<String, Integer>>() {});

            // Crear nuevo producto con Builder
            Producto producto = Producto.builder()
                    .nameProduct(productoDTO.getNameProduct())
                    .description(productoDTO.getDescription())
                    .price(productoDTO.getPrice())
                    .marca(productoDTO.getMarca())
                    .discount(productoDTO.isDiscount())
                    .porcentaje(productoDTO.getPorcentaje())
                    .indumentaria(productoDTO.getIndumentaria())
                    .genero(productoDTO.getGenero())
                    .actividad(productoDTO.getActividad())
                    .talles(talles)  // Aquí usamos el Map convertido
                    .build();

            Producto productoCreado = productoService.createProducto(
                    producto,
                    productoDTO.getImagen(),
                    talles
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Error al procesar los talles: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el producto: " + e.getMessage());
        }
    }
//    @PutMapping("/addImagen/{productoId}")
//    public ResponseEntity<?> addImageToProducto(
//            @RequestHeader(name = "Authorization", required = true) String token,
//            @PathVariable Long productoId,
//            @RequestParam("imagen") List<MultipartFile> imagen) {
//        try {
//            // Validar las imágenes proporcionadas
//            if (imagen == null || imagen.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Debe proporcionar al menos una imagen");
//            }
//            Producto productoActualizado = productoService.addImagesToProducto(productoId, imagen);
//
//            return ResponseEntity.ok(productoActualizado);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error de validación: " + e.getMessage());
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno: " + e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar imágenes: " + e.getMessage());
//        }
//    }


    private boolean isValidTalle(String talle) {
        return talle != null && !talle.trim().isEmpty();
    }
    @GetMapping("/buscarPorTalle")
    public ResponseEntity<List<Producto>> buscarProductosPorTalle(@RequestParam String talle) throws Exception{
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
    @GetMapping("/buscarCantidadProductoPorTalle/{productoId}/{talle}")
    public Integer buscarCantidadProducto(@PathVariable Long productoId, @PathVariable String talle){
        try{
            Integer cantProducto = productoService.obtenerCantidadTotalPorTalleProducto(productoId, talle);
            return cantProducto;
        }catch (Exception e){
            throw new RuntimeException("El producto con ID: "+productoId+" no tiene stock disponibe");
        }
    }
    @GetMapping("/buscarCantidadProducto/{productoId}")
    public ResponseEntity<Integer> obtenerCantidadTotal(@PathVariable Long productoId) {
        try {
            Integer cantidad = productoService.obtenerCantidadTotalPorProducto(productoId);
            return ResponseEntity.ok(cantidad);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/update/producto/{id}")
    public ResponseEntity<?> actualizarCampoProducto(@PathVariable Long id, @RequestBody ProductoUpdateRequest updateRequest) {
        try {
            Producto productoActualizado = productoService.actualizarProducto(id, updateRequest);
            if (productoActualizado != null) {
                return ResponseEntity.ok(productoActualizado);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el producto: " + e.getMessage());
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
    @GetMapping("/getAllUsuarios")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.getAllUsuarios();
        if (usuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(usuarios);
    }
    @GetMapping("getUsuario/{id}")
    public ResponseEntity<UsuarioDTO> getUsuario(@PathVariable Long id){
        UsuarioDTO usuarioDTO = usuarioService.getUsuario(id);
        if(usuarioDTO==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioDTO);
    }
    @PutMapping("/updateUsuario/{id}")
    public ResponseEntity<UsuarioResponse> updateUsuario(@PathVariable Long id, @RequestBody UsuarioRequest usuarioRequest) {
        UsuarioResponse response = usuarioService.updateUsuario(id, usuarioRequest);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/deleteUsuario/{id}")
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
