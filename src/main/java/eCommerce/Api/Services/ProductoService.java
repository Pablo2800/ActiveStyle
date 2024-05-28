package eCommerce.Api.Services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import eCommerce.Api.Entitys.Producto;
import eCommerce.Api.Entitys.ProductoUpdateRequest;
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
    public Producto createProducto(Producto producto, /*List<MultipartFile> imageFiles,*/ String[] talles) throws Exception {
        // Verificar si el producto ya existe
        Producto productoExistente = productoRepository.nameProduct(producto.getNameProduct());
        if (productoExistente != null) {
            throw new IllegalArgumentException("Ya existe un producto con ese nombre");
        }

//        int numImages = imageFiles.size();
//        if (numImages != 4 && numImages != 6) {
//            throw new IllegalArgumentException("Debe proporcionar exactamente 4 o 6 imágenes");
//        }

        // Validar talles
        if (talles == null || talles.length == 0) {
            throw new IllegalArgumentException("Debe proporcionar al menos un talle");
        }
        for (String talle : talles) {
            if (!isValidTalle(talle)) {
                throw new IllegalArgumentException("Talle inválido: " + talle);
            }
        }

        // Validar otros atributos del producto
        validateProductAttributes(producto);

//        List<String> imageUrls = new ArrayList<>();
//        for (MultipartFile file : imageFiles) {
//            try {
//                String imageUrl = uploadFile(file);
//                imageUrls.add(imageUrl);
//            } catch (IOException e) {
//                throw new RuntimeException("Error al subir la imagen: " + file.getOriginalFilename(), e);
//            }
//        }

//        producto.setImageUrls(imageUrls);
        producto.setTalles(talles);

        // Guardar el producto en la base de datos
        return productoRepository.save(producto);
    }

    private boolean isValidTalle(String talle) {
        // Aquí puedes añadir la lógica específica para validar un talle.
        return talle != null && !talle.trim().isEmpty();
    }

    private void validateProductAttributes(Producto producto) {
        if (producto.getNameProduct() == null || producto.getNameProduct().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del producto es obligatorio");
        }
        if (producto.getDescription() == null || producto.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción del producto es obligatoria");
        }
        if (producto.getPrice() <= 0) {
            throw new IllegalArgumentException("El precio del producto debe ser mayor a cero");
        }
        if (producto.getMarca() == null || producto.getMarca().trim().isEmpty()) {
            throw new IllegalArgumentException("La marca del producto es obligatoria");
        }
        if (producto.getStock() < 0) {
            throw new IllegalArgumentException("El stock del producto no puede ser negativo");
        }
        if (producto.getIndumentaria() == null || producto.getIndumentaria().trim().isEmpty()) {
            throw new IllegalArgumentException("La indumentaria del producto es obligatoria");
        }
        if (producto.getGenero() == null || producto.getGenero().trim().isEmpty()) {
            throw new IllegalArgumentException("El género del producto es obligatorio");
        }
        if (producto.getActividad() == null || producto.getActividad().trim().isEmpty()) {
            throw new IllegalArgumentException("La actividad del producto es obligatoria");
        }
    }

//    private String uploadFile(MultipartFile multipartFile) throws IOException {
//        try {
//            Map uploadResult = cloudinary.uploader()
//                    .upload(multipartFile.getBytes(),
//                            Map.of("public_id", UUID.randomUUID().toString()));
//            return uploadResult.get("url").toString();
//        } catch (IOException e) {
//            System.err.println("Error subiendo la imagen: " + e.getMessage());
//            e.printStackTrace();
//            throw e;
//        }
//    }

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

    public List<Producto> buscarPorTalle(String talle) {
        return productoRepository.findByTallesContains(talle);
    }
    public List<Producto> searchProductosByName(String nameProduct) {
        return productoRepository.findByNameProduct(nameProduct);
    }



    public Producto actualizarProducto(Long id, ProductoUpdateRequest updateRequest) {
        Producto producto = productoRepository.findById(id).orElse(null);
        if (producto != null) {
            if (updateRequest.getNombre() != null) {
                producto.setNameProduct(updateRequest.getNombre());
            }
            if (updateRequest.getDescripcion() != null) {
                producto.setDescription(updateRequest.getDescripcion());
            }
            if (updateRequest.getPrecio() != null) {
                producto.setPrice(updateRequest.getPrecio());
            }
            if (updateRequest.getMarca() != null) {
                producto.setMarca(updateRequest.getMarca());
            }
            if (updateRequest.getStock() != null) {
                producto.setStock(updateRequest.getStock());
            }
            if (updateRequest.getDiscount() != null) {
                producto.setDiscount(updateRequest.getDiscount());
            }
            if (updateRequest.getPorcentaje() != null) {
                producto.setPorcentaje(updateRequest.getPorcentaje());
            }
            if (updateRequest.getIndumentaria() != null) {
                producto.setIndumentaria(updateRequest.getIndumentaria());
            }
            if (updateRequest.getGenero() != null) {
                producto.setGenero(updateRequest.getGenero());
            }
            if (updateRequest.getActividad() != null) {
                producto.setActividad(updateRequest.getActividad());
            }
            if (updateRequest.getTalles() != null) {
                String[] nuevosTalles = updateRequest.getTalles();
                String[] tallesExistentes = producto.getTalles();
                List<String> tallesActualizados = new ArrayList<>(Arrays.asList(tallesExistentes));
                tallesActualizados.addAll(Arrays.asList(nuevosTalles));
                producto.setTalles(tallesActualizados.toArray(new String[0]));
            }
            if (updateRequest.getImageUrls() != null) {
                producto.setImageUrls(updateRequest.getImageUrls());
            }
            return productoRepository.save(producto);
        }
        return null; // O podrías lanzar una excepción indicando que el producto no se encontró
    }
    public void deleteProducto(Long id) {
        try {
            productoRepository.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException("No se encontró ningun producto con el id igual a "+id);
        }
    }
}
