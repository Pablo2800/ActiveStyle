package eCommerce.Api.Controllers.Usuarios;

import eCommerce.Api.Entitys.Enums.EstadoPedido;
import eCommerce.Api.Entitys.Pedido;
import eCommerce.Api.Services.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/activeStyle/pedidos")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;
    @GetMapping("/getPedido/{pedidoId}")
    public ResponseEntity<Optional<Pedido>> obtenerPedidoPorId(@PathVariable Long pedidoId){
        try{
            Optional<Pedido> pedidoOptional = pedidoService.getPedidoById(pedidoId);
            return ResponseEntity.ok(pedidoOptional);
        }catch (Exception e){
            throw new RuntimeException("No se encontró un pedido con ID: "+ pedidoId);
        }
    }
    @PostMapping("/crearPedido/{usuarioId}")
    public ResponseEntity<Pedido> crearPedido(@PathVariable Long usuarioId) {
        Pedido pedido = pedidoService.crearPedido(usuarioId);
        return ResponseEntity.ok(pedido);
    }
    @PutMapping("/cancelarOConfirmarPedido/{pedidoId}")
    public ResponseEntity<Pedido> actualizarEstadoPedido(
            @PathVariable Long pedidoId,
            @RequestParam EstadoPedido nuevoEstado) {
        try {
            // Actualizar el estado del pedido
            Pedido pedidoActualizado = pedidoService.cambiarEstadoPedido(pedidoId, nuevoEstado);
            return ResponseEntity.ok(pedidoActualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
