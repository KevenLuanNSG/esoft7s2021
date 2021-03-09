package br.unicesumar.esoft7s2021.back.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductService {
  @Autowired
  private ProductRepository productRepository;

  public List<Product> getAll(){
    return productRepository.findAll();
  }

  public Product getById(String id){
    return productRepository.findById(id).orElseGet(Product::new);
  }

  public void deleteById(String id){
    productRepository.deleteById(id);
  }

  public Product save(Product product){
    return productRepository.save(product);
  }
}
