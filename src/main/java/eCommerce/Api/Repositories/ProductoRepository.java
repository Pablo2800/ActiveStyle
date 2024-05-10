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
    List<Producto> findByTallesContains(int talle);
    List<Producto> findByIndumentariaIgnoreCase(String indumentaria);
    List<Producto> findByActividadIgnoreCase(String actividad);
    List<Producto> findByGeneroIgnoreCase(String genero);
    List<Producto> findByMarcaIgnoreCase(String marca);
    @Query("SELECT p FROM Producto p WHERE LOWER(p.nameProduct) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
