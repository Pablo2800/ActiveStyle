package eCommerce.Api.Repositories;

import eCommerce.Api.Entitys.CarritoCompras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarritoComprasRepository extends JpaRepository<CarritoCompras, Long> {
    Optional<CarritoCompras> findByUsuarioId(Long usuarioId);
}
