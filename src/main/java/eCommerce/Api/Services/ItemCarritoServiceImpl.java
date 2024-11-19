package eCommerce.Api.Services;

import eCommerce.Api.Entitys.ItemCarrito;
import eCommerce.Api.Repositories.CarritoComprasRepository;
import eCommerce.Api.Repositories.ItemCarritoRepository;
import eCommerce.Api.Repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCarritoServiceImpl implements ItemCarritoService {

    @Autowired
    private ItemCarritoRepository itemCarritoRepository;

    @Autowired
    private CarritoComprasRepository carritoComprasRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public List<ItemCarrito> findAll() throws Exception {
        try {
            return itemCarritoRepository.findAll();
        } catch (Exception e) {
            throw new Exception("Error retrieving all cart items", e);
        }
    }

    @Override
    public ItemCarrito findById(Long id) throws Exception {
        try {
            return itemCarritoRepository.findById(id)
                    .orElseThrow(() -> new Exception("Cart item not found"));
        } catch (Exception e) {
            throw new Exception("Error retrieving cart item by id", e);
        }
    }

    @Override
    public ItemCarrito createItemCarrito(ItemCarrito itemCarrito) throws Exception {
        try {
            // Validar y establecer relaciones
            validateAndSetRelationships(itemCarrito);

            return itemCarritoRepository.save(itemCarrito);
        } catch (Exception e) {
            throw new Exception("Error creating cart item", e);
        }
    }

    @Override
    public ItemCarrito updateItemCarrito(Long id, ItemCarrito itemCarritoDetails) throws Exception {
        try {
            ItemCarrito itemCarrito = findById(id);
            itemCarrito.setCantidad(itemCarritoDetails.getCantidad());

            // Validar y establecer relaciones
            validateAndSetRelationships(itemCarritoDetails);
            itemCarrito.setCarritoCompras(itemCarritoDetails.getCarritoCompras());
            itemCarrito.setProducto(itemCarritoDetails.getProducto());

            return itemCarritoRepository.save(itemCarrito);
        } catch (Exception e) {
            throw new Exception("Error updating cart item", e);
        }
    }

    @Override
    public void deleteItemCarrito(Long id) throws Exception {
        try {
            ItemCarrito itemCarrito = findById(id);
            itemCarritoRepository.delete(itemCarrito);
        } catch (Exception e) {
            throw new Exception("Error deleting cart item", e);
        }
    }

    private void validateAndSetRelationships(ItemCarrito itemCarrito) throws Exception {
        if (itemCarrito.getCarritoCompras() != null) {
            Long carritoId = itemCarrito.getCarritoCompras().getId();
            carritoComprasRepository.findById(carritoId)
                    .orElseThrow(() -> new Exception("CarritoCompras not found with id " + carritoId));
        }

        if (itemCarrito.getProducto() != null) {
            Long productoId = itemCarrito.getProducto().getId();
            productoRepository.findById(productoId)
                    .orElseThrow(() -> new Exception("Producto not found with id " + productoId));
        }
    }
}

