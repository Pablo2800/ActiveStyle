package eCommerce.Api.Controllers.Usuarios;

import eCommerce.Api.Entitys.ItemCarrito;
import eCommerce.Api.Services.ItemCarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activeStyle/item-carrito")
@CrossOrigin("*")
public class ItemCarritoController {

    @Autowired
    private ItemCarritoService itemCarritoService;

    @GetMapping
    public ResponseEntity<List<ItemCarrito>> getAllItemCarritos() {
        try {
            List<ItemCarrito> itemCarritos = itemCarritoService.findAll();
            return ResponseEntity.ok(itemCarritos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemCarrito> getItemCarritoById(@PathVariable Long id) {
        try {
            ItemCarrito itemCarrito = itemCarritoService.findById(id);
            return ResponseEntity.ok(itemCarrito);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<ItemCarrito> createItemCarrito(@RequestBody ItemCarrito itemCarrito) {
        try {
            ItemCarrito createdItemCarrito = itemCarritoService.createItemCarrito(itemCarrito);
            return ResponseEntity.status(201).body(createdItemCarrito);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemCarrito> updateItemCarrito(@PathVariable Long id, @RequestBody ItemCarrito itemCarritoDetails) {
        try {
            ItemCarrito updatedItemCarrito = itemCarritoService.updateItemCarrito(id, itemCarritoDetails);
            return ResponseEntity.ok(updatedItemCarrito);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemCarrito(@PathVariable Long id) {
        try {
            itemCarritoService.deleteItemCarrito(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}

