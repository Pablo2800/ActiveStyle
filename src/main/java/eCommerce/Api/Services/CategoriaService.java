package eCommerce.Api.Services;

import eCommerce.Api.Entitys.Categoria;
import eCommerce.Api.Repositories.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> findAllCategorias() throws Exception{
        try{
            return categoriaRepository.findAll();
        }catch(Exception e){
            throw new Exception("No se encontró ningún cliente para mostrar");
        }
    }
    public Categoria findByIdCategoria(Long id) throws Exception{
            Optional<Categoria> categoriaOptional = categoriaRepository.findById(id);
            if (categoriaOptional.isPresent()){
                return categoriaOptional.get();
            }else {
                throw new Exception("La categoria buscada no existe");
        }
    }
    public Categoria createCategoria(Categoria categoria) throws Exception{
        Categoria categoriaExistente = categoriaRepository.findByNameCategory(categoria.getNameCategory());
        if (categoriaExistente!= null){
            throw new Exception("Ya existe una categoria con ese nombre");
        }else{
            return categoriaRepository.save(categoria);
        }
    }
    public Categoria updateCategoria(Long id, Categoria categoria) throws Exception{
        Optional<Categoria> categoriaOptional = categoriaRepository.findById(id);
        if (categoriaOptional.isPresent()){
            Categoria categoriaExistente = categoriaOptional.get();
            if (categoria.getNameCategory() != null){
                categoriaExistente.setNameCategory(categoria.getNameCategory());
            }
            return categoriaRepository.save(categoriaExistente);
        }
        else{
            throw new Exception("No se encontró una categoria con el id ingresado "+id);
        }
    }
    public void deleteCategoria(Long id) throws Exception{
        if (categoriaRepository.existsById(id)){
            categoriaRepository.deleteById(id);
        }else{
            throw new Exception("No se encontró ninguna categoria asociada con el id "+id);
        }
    }
}
