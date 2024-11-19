package eCommerce.Api.Services;

import eCommerce.Api.Entitys.CarritoCompras;
import eCommerce.Api.Entitys.ItemCarrito;

public interface CarritoComprasService {
    CarritoCompras getCarritoByClienteId(Long clienteId);
//    ItemCarrito addItemToCarrito(Long clienteId, Long productoId);
    ItemCarrito substractQuantityFromCarrito(Long clienteId, Long itemId) throws Exception;
    ItemCarrito addItemCarrito(Long clienteId, Long productId, String talleSeleccionado) throws Exception;
    void removeAllItemsFromCarrito(Long carritoId);
    void removeItemFromCarrito(Long carritoId, Long itemId) throws Exception;
}
