package eCommerce.Api.Repositories;

import eCommerce.Api.Entitys.Usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    @Modifying()
    @Query("update Usuario u set u.firstname=:firstname, u.lastname=:lastname, u.country=:country, u.floor_number=:floor_number, u.direction_number=:direction_number, u.dni=:dni, u.cellphone=:cellphone, u.department=:department, u.direction=:direction, u.email=:email where u.id =:id")
    void updateUsuario(@Param(value = "id") Long id, @Param(value = "firstname") String firstname, @Param(value = "lastname") String lastname, @Param(value = "country") String country, @Param(value = "floor_number") String floor_number, @Param(value = "direction_number") int direction_number, @Param(value = "dni") Long dni, @Param(value = "cellphone") Long cellphone, @Param(value = "department") String department, @Param(value = "direction") String direction, @Param(value = "email") String email);
}
