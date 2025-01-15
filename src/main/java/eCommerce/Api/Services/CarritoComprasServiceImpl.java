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

import java.util.HashMap;
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
    public ItemCarrito addItemCarritoCantidad(Long clienteId, Long productId, String talleSeleccionado, int cantidad) throws Exception {
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

        // Verificar disponibilidad del talle seleccionado (solo en memoria, sin actualizar la base de datos)
        Map<String, Integer> talles = producto.getTalles();
        Integer cantidadTalle = talles.get(talleSeleccionado);

        if (cantidadTalle == null || cantidadTalle <= 0) {
            // Si no hay stock disponible para el talle seleccionado
            throw new RuntimeException("No hay stock disponible para el talle seleccionado.");
        }

        // Verificar que la cantidad solicitada no supere el stock disponible
        if (cantidad > cantidadTalle) {
            throw new RuntimeException("No hay suficiente stock para la cantidad solicitada.");
        }

        // Aquí restamos en memoria (sin afectar la base de datos)
        Optional<ItemCarrito> optionalItemCarrito = itemCarritoRepository.findByCarritoComprasIdAndProductoIdAndTalle(carrito.getId(), productId, talleSeleccionado);

        if (optionalItemCarrito.isPresent()) {
            // Si el item ya existe en el carrito, obtener la cantidad actual
            ItemCarrito itemCarritoExistente = optionalItemCarrito.get();
            int cantidadActual = itemCarritoExistente.getCantidad();

            // Limitar la cantidad a lo que hay en stock
            if (cantidadActual + cantidad > cantidadTalle) {
                // Aquí se lanza un mensaje específico si se intenta agregar más productos de los que hay en stock
                throw new RuntimeException("Ya se alcanzó el límite máximo de stock disponible para el talle seleccionado.");
            }

            // Si hay stock suficiente, incrementar la cantidad del item en el carrito
            itemCarritoExistente.setCantidad(cantidadActual + cantidad); // Se suma la cantidad solicitada
            return itemCarritoRepository.save(itemCarritoExistente);
        } else {
            // Si el ítem no existe, crear uno nuevo con la cantidad proporcionada
            ItemCarrito itemCarrito = new ItemCarrito();
            itemCarrito.setProducto(producto);
            itemCarrito.setCantidad(cantidad);  // Se añade la cantidad proporcionada
            itemCarrito.setCarritoCompras(carrito);
            itemCarrito.setTalle(talleSeleccionado);

            return itemCarritoRepository.save(itemCarrito);
        }
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

        // Verificar disponibilidad del talle seleccionado (solo en memoria, sin actualizar la base de datos)
        Map<String, Integer> talles = producto.getTalles();
        Integer cantidadTalle = talles.get(talleSeleccionado);

        if (cantidadTalle == null || cantidadTalle <= 0) {
            // Si no hay stock disponible para el talle seleccionado
            throw new RuntimeException("No hay stock disponible para el talle seleccionado.");
        }

        // Aquí restamos en memoria (sin afectar la base de datos)
        Optional<ItemCarrito> optionalItemCarrito = itemCarritoRepository.findByCarritoComprasIdAndProductoIdAndTalle(carrito.getId(), productId, talleSeleccionado);

        if (optionalItemCarrito.isPresent()) {
            // Si el item ya existe en el carrito, obtener la cantidad actual
            ItemCarrito itemCarritoExistente = optionalItemCarrito.get();
            int cantidadActual = itemCarritoExistente.getCantidad();

            // Limitar la cantidad a lo que hay en stock
            if (cantidadActual >= cantidadTalle) {
                // Aquí se lanza un mensaje específico si se intenta agregar más productos de los que hay en stock
                throw new RuntimeException("Ya se alcanzó el límite máximo de stock disponible para el talle seleccionado.");
            }

            // Si hay stock suficiente, incrementar la cantidad del item en el carrito
            itemCarritoExistente.setCantidad(cantidadActual + 1); // Solo se puede agregar una unidad más
            return itemCarritoRepository.save(itemCarritoExistente);
        } else {
            // Si el ítem no existe, crear uno nuevo con cantidad 1
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

            if (nuevaCantidad == 0) {
                // Eliminar el item del carrito si la cantidad es 0
                itemCarritoRepository.delete(itemCarrito);
                return null; // Puedes devolver null o lanzar una excepción, según lo que desees manejar.
            }

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
