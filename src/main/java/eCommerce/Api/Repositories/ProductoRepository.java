package eCommerce.Api.Repositories;
import eCommerce.Api.Entitys.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Producto nameProduct(String nameProduct);

    List<Producto> findByNameProduct(String nameProduct);
    List<Producto> findByTallesContains(int talle);

}
