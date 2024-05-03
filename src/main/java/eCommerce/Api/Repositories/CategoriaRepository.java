package eCommerce.Api.Repositories;

import eCommerce.Api.Entitys.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Categoria findByNameCategory(String nameCategory);
}
