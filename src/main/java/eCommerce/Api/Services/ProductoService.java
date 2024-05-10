package eCommerce.Api.Services;

import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Repositories.ProductoRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public List<Producto> findAllProductos(){
        try {
            return productoRepository.findAll();
        }catch (Exception e){
            throw new RuntimeException("No hay ningún producto en pantalla para mostrar");
        }
    }
    public Optional<Producto> obtenerProducto(Long id) {
        return productoRepository.findById(id);
    }
    @Transactional
    public Producto createProducto(Producto producto, int[] talles) throws Exception {
        // Verificar si ya existe un producto con el mismo nombre
        Producto productoExistente = productoRepository.nameProduct(producto.getNameProduct());
        if (productoExistente != null) {
            throw new Exception("Ya existe un producto con ese nombre");
        } else {
            producto.setTalles(talles);
            return productoRepository.save(producto);
        }
    }
    public List<Producto> buscarProductosPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }
    public List<Producto> buscarProductosPorIndumentaria(String indumentaria) {
        return productoRepository.findByIndumentariaIgnoreCase(indumentaria);
    }
    public List<Producto> buscarProductosPorActividad(String actividad) {
        return productoRepository.findByActividadIgnoreCase(actividad);
    }
    public List<Producto> buscarProductosPorGenero(String genero) {
        return productoRepository.findByGeneroIgnoreCase(genero);
    }
    public List<Producto> buscarProductoPorMarca(String marca) {
        return productoRepository.findByMarcaIgnoreCase(marca);
    }

    public List<Producto> buscarPorTalle(int talle) {
        return productoRepository.findByTallesContains(talle);
    }
    public List<Producto> searchProductosByName(String nameProduct) {
        return productoRepository.findByNameProduct(nameProduct);
    }



    public Producto updatePorducto(Long id){
        try{
            Optional<Producto> productoOptional = productoRepository.findById(id);
            if (productoOptional.isPresent()){
                return productoOptional.get();
            }else{
                throw new RuntimeException("No se encontró un producto para actualizar con el id igual a " +id);
            }
        }catch (Exception e){
            throw new RuntimeException("Error al procesar la solicitud en el servidor, vuelva a intenrar más tarde");
        }
    }
    public void deleteProducto(Long id) {
        try {
            productoRepository.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException("No se encontró ningun producto con el id igual a "+id);
        }
    }
}
