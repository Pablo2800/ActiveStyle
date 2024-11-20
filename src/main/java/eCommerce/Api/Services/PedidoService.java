package eCommerce.Api.Services;

import eCommerce.Api.Entitys.CarritoCompras;
import eCommerce.Api.Entitys.Enums.EstadoPedido;
import eCommerce.Api.Entitys.ItemCarrito;
import eCommerce.Api.Entitys.ItemPedido;
import eCommerce.Api.Entitys.Pedido;
import eCommerce.Api.Entitys.Usuario.Usuario;
import eCommerce.Api.Repositories.CarritoComprasRepository;
import eCommerce.Api.Repositories.PedidoRepository;
import eCommerce.Api.Repositories.ProductoRepository;
import eCommerce.Api.Repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final CarritoComprasRepository carritoComprasRepository;
    private final PedidoRepository pedidoRepository;

    public Optional<Pedido> getPedidoById(Long pedidoId) {
        return pedidoRepository.findById(pedidoId);
    }
    public Pedido crearPedido(Long usuarioId) {
        // Obtener el carrito del usuario
        CarritoCompras carrito = carritoComprasRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado para el usuario con ID: " + usuarioId));
        // Crear el pedido
        Pedido pedido = new Pedido();
        pedido.setUsuario(carrito.getUsuario());
        pedido.setFechaCreacion(new Date());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setMailingAddress(carrito.getUsuario().getAddress());

        List<ItemPedido> itemsPedido = new ArrayList<>();
        double total = 0;

        for (ItemCarrito itemCarrito : carrito.getItemCarritos()) {
            // Calcular el subtotal para cada ítem
            double precio = itemCarrito.getProducto().isDiscount()
                    ? itemCarrito.getProducto().getPrice() * (1 - (itemCarrito.getProducto().getPorcentaje() / 100.0))
                    : itemCarrito.getProducto().getPrice();
            double subtotal = precio * itemCarrito.getCantidad();

            // Crear el item del pedido
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setProducto(itemCarrito.getProducto());
            itemPedido.setCantidad(itemCarrito.getCantidad());
            itemPedido.setTalle(itemCarrito.getTalle());
            itemPedido.setSubtotal(subtotal);

            itemsPedido.add(itemPedido);
            total += subtotal;
        }

        // Configurar los ítems y el total al pedido
        pedido.setItems(itemsPedido);
        pedido.setTotal(total);

        // Guardar el pedido en la base de datos
        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // Limpiar el carrito después de realizar el pedido
        carrito.getItemCarritos().clear();
        carritoComprasRepository.save(carrito);

        return pedidoGuardado;
    }
    @Transactional
    public Pedido cambiarEstadoPedido(Long pedidoId, EstadoPedido nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado con ID: " + pedidoId));

        // Validar la transición del estado
        if (pedido.getEstado() == EstadoPedido.CONFIRMADO || pedido.getEstado() == EstadoPedido.CANCELADO) {
            throw new IllegalStateException("No se puede cambiar el estado de un pedido ya entregado o cancelado.");
        }

        // Actualizar el estado
        pedido.setEstado(nuevoEstado);
        return pedidoRepository.save(pedido);
    }
}

