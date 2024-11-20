package eCommerce.Api.Repositories;

import eCommerce.Api.Entitys.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
