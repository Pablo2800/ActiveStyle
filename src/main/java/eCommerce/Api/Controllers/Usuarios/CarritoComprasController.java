package eCommerce.Api.Controllers.Usuarios;

import eCommerce.Api.Entitys.CarritoCompras;
import eCommerce.Api.Entitys.ItemCarrito;
import eCommerce.Api.Services.CarritoComprasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/activeStyle/carrito")
@CrossOrigin("*")
public class CarritoComprasController {
    @Autowired
    private CarritoComprasService carritoComprasService;

    @GetMapping("/{clienteId}")
    public ResponseEntity<CarritoCompras> getCarritoByClienteId(@PathVariable Long clienteId) {
        CarritoCompras carrito = carritoComprasService.getCarritoByClienteId(clienteId);
        if (carrito == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(carrito);
    }
    @PostMapping("/addQuantity/{clienteId}/{productId}/{talleSeleccionado}/{cantidad}")
    public ResponseEntity<ItemCarrito> addItemToCarrito(
            @PathVariable Long clienteId,
            @PathVariable Long productId,
            @PathVariable String talleSeleccionado,
            @PathVariable int cantidad
    ) {
        try {
            ItemCarrito itemCarrito = carritoComprasService.addItemCarritoCantidad(clienteId, productId, talleSeleccionado, cantidad);
            return ResponseEntity.ok(itemCarrito);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @PostMapping("/add/{clienteId}/{productId}/{talleSeleccionado}")
    public ResponseEntity<ItemCarrito> addItemToCarrito(
            @PathVariable Long clienteId,
            @PathVariable Long productId,
            @PathVariable String talleSeleccionado) {
        try {
            ItemCarrito itemCarrito = carritoComprasService.addItemCarrito(clienteId, productId, talleSeleccionado);
            return ResponseEntity.ok(itemCarrito);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @PutMapping("cliente/{clienteId}/item/{itemId}/subtractQuantity")
    public ResponseEntity<ItemCarrito> subtractQuantityFromCarrito(@PathVariable Long clienteId, @PathVariable Long itemId) {
        try {
            ItemCarrito updatedItemCarrito = null;
            try {
                updatedItemCarrito = carritoComprasService.substractQuantityFromCarrito(clienteId, itemId);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            return ResponseEntity.ok(updatedItemCarrito);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(null);
        }
    }
    @DeleteMapping("/{carritoId}/removeAllItems")
    public ResponseEntity<Void> removeAllItemsFromCarrito(@PathVariable Long carritoId) {
        try {
            carritoComprasService.removeAllItemsFromCarrito(carritoId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @DeleteMapping("/{carritoId}/items/{itemId}")
    public ResponseEntity<Void> removeItemFromCarrito(@PathVariable Long carritoId, @PathVariable Long itemId) {
        try {
            carritoComprasService.removeItemFromCarrito(carritoId, itemId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.noContent().build();
    }
}
