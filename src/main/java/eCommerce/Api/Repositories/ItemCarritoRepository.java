package eCommerce.Api.Repositories;

import eCommerce.Api.Entitys.ItemCarrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ItemCarritoRepository extends JpaRepository<ItemCarrito, Long> {
    @Query("SELECT i FROM ItemCarrito i WHERE i.carritoCompras.id = :carritoId AND i.producto.id = :productoId")
    Optional<ItemCarrito> findByCarritoComprasIdAndProductoId(@Param("carritoId") Long carritoId, @Param("productoId") Long productoId);
    @Query("SELECT i FROM ItemCarrito i WHERE i.id = :itemId AND i.carritoCompras.id = :carritoId")
    Optional<ItemCarrito> findByIdAndCarritoComprasId(@Param("itemId") Long itemId, @Param("carritoId") Long carritoId);
    List<ItemCarrito> findByCarritoComprasId(Long carritoId);
    Optional<ItemCarrito> findByCarritoComprasIdAndProductoIdAndTalle(Long carritoId, Long productoId, String talle);
}
