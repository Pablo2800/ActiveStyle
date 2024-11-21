package eCommerce.Api.Services;

import eCommerce.Api.Entitys.*;
import eCommerce.Api.Entitys.Enums.EstadoPedido;
import eCommerce.Api.Entitys.Usuario.Usuario;
import eCommerce.Api.Repositories.CarritoComprasRepository;
import eCommerce.Api.Repositories.PedidoRepository;
import eCommerce.Api.Repositories.ProductoRepository;
import eCommerce.Api.Repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final CarritoComprasRepository carritoComprasRepository;
    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    public Optional<Pedido> getPedidoById(Long pedidoId) {
        return pedidoRepository.findById(pedidoId);
    }
    public Pedido crearPedido(Long usuarioId) {

        CarritoCompras carrito = carritoComprasRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no encontrado para el usuario con ID: " + usuarioId));

        Pedido pedido = new Pedido();
        pedido.setUsuario(carrito.getUsuario());
        pedido.setFechaCreacion(new Date());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setMailingAddress(carrito.getUsuario().getAddress());

        List<ItemPedido> itemsPedido = new ArrayList<>();
        double total = 0;

        // Iterar sobre los ítems en el carrito
        for (ItemCarrito itemCarrito : carrito.getItemCarritos()) {
            // Calcular el precio con descuento si aplica
            double precio = itemCarrito.getProducto().isDiscount()
                    ? itemCarrito.getProducto().getPrice() * (1 - (itemCarrito.getProducto().getPorcentaje() / 100.0))
                    : itemCarrito.getProducto().getPrice();
            double subtotal = precio * itemCarrito.getCantidad();

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setProducto(itemCarrito.getProducto());
            itemPedido.setCantidad(itemCarrito.getCantidad());
            itemPedido.setTalle(itemCarrito.getTalle());
            itemPedido.setSubtotal(subtotal);

            itemsPedido.add(itemPedido);
            total += subtotal;

            // Actualizar el stock del producto
            Producto producto = itemCarrito.getProducto();
            Map<String, Integer> talles = producto.getTalles();
            Integer cantidadTalle = talles.get(itemCarrito.getTalle());

            // Restar el stock del talle correspondiente
            if (cantidadTalle != null && cantidadTalle >= itemCarrito.getCantidad()) {
                talles.put(itemCarrito.getTalle(), cantidadTalle - itemCarrito.getCantidad());  // Restamos la cantidad
                producto.setTalles(talles);
                productoRepository.save(producto);
            } else {
                throw new RuntimeException("No hay suficiente stock para el producto " + producto.getNameProduct() + " con el talle " + itemCarrito.getTalle());
            }
        }

        pedido.setItems(itemsPedido);
        pedido.setTotal(total);

        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        carrito.getItemCarritos().clear();
        carritoComprasRepository.save(carrito);

        return pedidoGuardado;
    }

    @Transactional
    public Pedido cambiarEstadoPedido(Long pedidoId, EstadoPedido nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado con ID: " + pedidoId));

        if (pedido.getEstado() == EstadoPedido.CONFIRMADO || pedido.getEstado() == EstadoPedido.CANCELADO) {
            throw new IllegalStateException("No se puede cambiar el estado de un pedido ya entregado o cancelado.");
        }

        if (nuevoEstado == EstadoPedido.CANCELADO) {
            for (ItemPedido item : pedido.getItems()) {
                Producto producto = item.getProducto();

                // Actualizar el stock según el talle
                String talle = item.getTalle();
                int cantidadDevolver = item.getCantidad();

                // Validar existencia del talle en el producto
                Map<String, Integer> talles = producto.getTalles();
                if (talles.containsKey(talle)) {
                    talles.put(talle, talles.get(talle) + cantidadDevolver); // Devolver stock
                } else {
                    throw new IllegalStateException("El producto no contiene el talle especificado: " + talle);
                }

                productoRepository.save(producto); // Guardar cambios en el producto
            }
        }
        pedido.setEstado(nuevoEstado);
        return pedidoRepository.save(pedido);
    }
}

