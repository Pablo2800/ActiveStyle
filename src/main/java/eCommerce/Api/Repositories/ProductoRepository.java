package eCommerce.Api.Repositories;
import eCommerce.Api.Entitys.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Producto nameProduct(String nameProduct);

    List<Producto> findByNameProduct(String nameProduct);
    @Query(value = "SELECT p FROM Producto p JOIN p.talles t WHERE KEY(t) = :talle")
    List<Producto> findByTalleKey(@Param("talle") String talle);
    List<Producto> findByIndumentariaIgnoreCase(String indumentaria);
    List<Producto> findByActividadIgnoreCase(String actividad);
    List<Producto> findByGeneroIgnoreCase(String genero);
    List<Producto> findByMarcaIgnoreCase(String marca);
    @Query("SELECT VALUE(t) FROM Producto p JOIN p.talles t WHERE p.id = :productoId AND KEY(t) = :talle")
    Integer findCantidadByProductoIdAndTalle(@Param("productoId") Long productoId, @Param("talle") String talle);
    @Query("SELECT SUM(VALUE(t)) FROM Producto p JOIN p.talles t WHERE p.id = :productoId")
    Integer findTotalCantidadByProductoId(@Param("productoId") Long productoId);
    @Query("SELECT p FROM Producto p WHERE LOWER(p.nameProduct) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
