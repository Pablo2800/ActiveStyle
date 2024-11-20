package eCommerce.Api.Entitys.Usuario;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import eCommerce.Api.Entitys.CarritoCompras;
import eCommerce.Api.Entitys.Enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "usuario", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})} )
@EqualsAndHashCode(exclude = "carritoCompras")
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String username;
    private String lastname;
    private String firstname;
    private String address;
    private String email;
    private Long cellphone;
    private Long dni;
    String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "carrito_compras_id", referencedColumnName = "id")
    @JsonManagedReference
    private CarritoCompras carritoCompras;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}

