package eCommerce.Api.Services;

import com.cloudinary.Cloudinary;
import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Repositories.ProductoRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private Cloudinary cloudinary;

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
    public Producto createProducto(Producto producto, List<MultipartFile> imageFiles, int[] talles) throws Exception {
        // Verificar si ya existe un producto con el mismo nombre
        Producto productoExistente = productoRepository.nameProduct(producto.getNameProduct());
        if (productoExistente != null) {
            throw new Exception("Ya existe un producto con ese nombre");
        } else {
            // Subir los archivos a Cloudinary y obtener las URLs de las imágenes
            List<String> imageUrls = new ArrayList<>();
            int maxImages = 6; // Límite máximo de imágenes
            for (int i = 0; i < Math.min(imageFiles.size(), maxImages); i++) {
                MultipartFile file = imageFiles.get(i);
                String imageUrl = uploadFile(file);
                imageUrls.add(imageUrl);
            }

            // Establecer las URLs de las imágenes en el producto
            producto.setImageUrls(imageUrls);

            // Establecer los talles del producto
            producto.setTalles(talles);

            // Guardar el producto en la base de datos
            return productoRepository.save(producto);
        }
    }

    private String uploadFile(MultipartFile multipartFile) throws IOException {
        // Subir el archivo a Cloudinary y devolver la URL de la imagen
        return cloudinary.uploader()
                .upload(multipartFile.getBytes(),
                        Map.of("public_id",
                                UUID.randomUUID().toString()))
                .get("url")
                .toString();
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
