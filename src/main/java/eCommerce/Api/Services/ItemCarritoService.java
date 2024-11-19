package eCommerce.Api.Services;

import eCommerce.Api.Entitys.ItemCarrito;

import java.util.List;

public interface ItemCarritoService {
    List<ItemCarrito> findAll() throws Exception;
    ItemCarrito findById(Long id) throws Exception;
    ItemCarrito createItemCarrito(ItemCarrito itemCarrito) throws Exception;
    ItemCarrito updateItemCarrito(Long id, ItemCarrito itemCarritoDetails) throws Exception;
    void deleteItemCarrito(Long id) throws Exception;
}
