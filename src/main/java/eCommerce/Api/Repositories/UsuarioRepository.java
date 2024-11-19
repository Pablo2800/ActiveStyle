package eCommerce.Api.Repositories;

import eCommerce.Api.Entitys.Role;
import eCommerce.Api.Entitys.Usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    @Modifying
    @Query("UPDATE Usuario u SET u.firstname = :firstname, u.lastname = :lastname, u.dni = :dni, u.cellphone = :cellphone, u.address = :address, u.email = :email WHERE u.id = :id")
    void updateUsuario(@Param("id") Long id,
                       @Param("firstname") String firstname,
                       @Param("lastname") String lastname,
                       @Param("dni") String dni,
                       @Param("cellphone") String cellphone,
                       @Param("address") String address,
                       @Param("email") String email);
    boolean existsByRole(Role role);
}
