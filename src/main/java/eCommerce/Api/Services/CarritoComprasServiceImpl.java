package eCommerce.Api.Services;

import eCommerce.Api.Entitys.CarritoCompras;
import eCommerce.Api.Entitys.ItemCarrito;
import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Entitys.Usuario.Usuario;
import eCommerce.Api.Repositories.CarritoComprasRepository;
import eCommerce.Api.Repositories.ItemCarritoRepository;
import eCommerce.Api.Repositories.ProductoRepository;
import eCommerce.Api.Repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CarritoComprasServiceImpl implements CarritoComprasService{
    @Autowired
    private CarritoComprasRepository carritoComprasRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ItemCarritoRepository itemCarritoRepository;
    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public CarritoCompras getCarritoByClienteId(Long clienteId) {
        return carritoComprasRepository.findByUsuarioId(clienteId).orElse(null);
    }
    @Transactional
    public ItemCarrito addItemCarrito(Long clienteId, Long productId, String talleSeleccionado) throws Exception {
        // Obtener el cliente por su ID
        Usuario usuario = usuarioRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // Obtener el carrito de compras del cliente, si existe
        CarritoCompras carrito = usuario.getCarritoCompras();

        // Si el cliente no tiene un carrito asignado, lanzar una excepción
        if (carrito == null) {
            throw new RuntimeException("El cliente no tiene un carrito de compras asignado.");
        }

        // Buscar el producto por su ID
        Producto producto = productoRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Verificar disponibilidad del talle seleccionado
        Map<String, Integer> talles = producto.getTalles();
        Integer cantidadTalle = talles.get(talleSeleccionado);

        if (cantidadTalle == null || cantidadTalle <= 0) {
            throw new RuntimeException("El talle seleccionado no está disponible o no tiene stock suficiente");
        }

        // Actualizar el stock del talle seleccionado
        talles.put(talleSeleccionado, cantidadTalle - 1);
        producto.setTalles(talles);
        productoRepository.save(producto);

        // Verificar si ya existe un ítem con el mismo producto y talle en el carrito
        Optional<ItemCarrito> optionalItemCarrito = itemCarritoRepository.findByCarritoComprasIdAndProductoIdAndTalle(carrito.getId(), productId, talleSeleccionado);

        // Si el ítem ya existe, solo incrementar la cantidad
        if (optionalItemCarrito.isPresent()) {
            ItemCarrito itemCarritoExistente = optionalItemCarrito.get();
            itemCarritoExistente.setCantidad(itemCarritoExistente.getCantidad() + 1);
            return itemCarritoRepository.save(itemCarritoExistente);
        } else {
            // Si el ítem no existe, crear uno nuevo
            ItemCarrito itemCarrito = new ItemCarrito();
            itemCarrito.setProducto(producto);
            itemCarrito.setCantidad(1);  // Asumimos que el ítem se añade con cantidad 1
            itemCarrito.setCarritoCompras(carrito);
            itemCarrito.setTalle(talleSeleccionado);

            return itemCarritoRepository.save(itemCarrito);
        }
    }

    @Override
    public ItemCarrito substractQuantityFromCarrito(Long clienteId, Long itemId) {

        Usuario usuario = usuarioRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente not found"));

        CarritoCompras carrito = usuario.getCarritoCompras();
        if (carrito == null) {
            throw new RuntimeException("El cliente no tiene un carrito de compras.");
        }

        ItemCarrito itemCarrito = itemCarritoRepository.findByIdAndCarritoComprasId(itemId, carrito.getId())
                .orElseThrow(() -> new RuntimeException("ItemCarrito not found"));

        Producto producto = itemCarrito.getProducto();
        String talle = itemCarrito.getTalle();

        Map<String, Integer> talles = producto.getTalles();
        Integer cantidadTalle = talles.get(talle);

        int nuevaCantidad = itemCarrito.getCantidad() - 1;
        if (nuevaCantidad >= 0) {
            itemCarrito.setCantidad(nuevaCantidad);

            if (cantidadTalle != null) {
                talles.put(talle, cantidadTalle + 1);
            } else {
                talles.put(talle, 1);
            }
            producto.setTalles(talles);
            productoRepository.save(producto);

            return itemCarritoRepository.save(itemCarrito);
        } else {
            throw new RuntimeException("No se puede disminuir más la cantidad.");
        }
    }

    @Override
    public void removeAllItemsFromCarrito(Long carritoId) {
        CarritoCompras carrito = carritoComprasRepository.findById(carritoId)
                .orElseThrow(() -> new RuntimeException("CarritoCompras not found"));

        List<ItemCarrito> items = itemCarritoRepository.findByCarritoComprasId(carritoId);

        for (ItemCarrito item : items) {
            Producto producto = item.getProducto();
            String talle = item.getTalle();

            Map<String, Integer> talles = producto.getTalles();

            Integer cantidadTalle = talles.get(talle);
            if (cantidadTalle != null) {
                talles.put(talle, cantidadTalle + item.getCantidad());
            } else {
                talles.put(talle, item.getCantidad());
            }

            producto.setTalles(talles);
            productoRepository.save(producto);

            // Eliminar el ítem del carrito
            itemCarritoRepository.delete(item);
        }
    }
    @Override
    public void removeItemFromCarrito(Long carritoId, Long itemId) throws Exception {
        try {
            ItemCarrito itemCarrito = itemCarritoRepository.findByIdAndCarritoComprasId(itemId, carritoId)
                    .orElseThrow(() -> new RuntimeException("ItemCarrito not found"));

            Producto producto = itemCarrito.getProducto();
            String talle = itemCarrito.getTalle();

            Map<String, Integer> talles = producto.getTalles();
            Integer cantidadTalle = talles.get(talle);

            if (cantidadTalle != null) {
                talles.put(talle, cantidadTalle + itemCarrito.getCantidad());
            } else {
                talles.put(talle, itemCarrito.getCantidad());
            }

            producto.setTalles(talles);
            productoRepository.save(producto);

            // Eliminar el ítem del carrito
            itemCarritoRepository.delete(itemCarrito);

        } catch (Exception e) {
            throw new Exception("Error deleting cart item", e);
        }
    }
}
