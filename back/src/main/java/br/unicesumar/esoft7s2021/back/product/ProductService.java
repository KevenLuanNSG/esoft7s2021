package br.unicesumar.esoft7s2021.back.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ProductService {
  @Autowired
  private ProductRepository productRepository;

  public Page<Product> getAllWithPage(Pageable pageable, String search){
    if(search == null || search.length() == 0){
      return productRepository.findAll(pageable);
    }
    return productRepository.findByDescriptionSearchPage(pageable, search);
  }

  public List<Product> getAll(String search){
    if(search == null || search.length() == 0){
      return productRepository.findAll();
    }
    return productRepository.findByDescriptionSearch(search);
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

  public String generateProducts(Long quantity) {
    for (int i = 0; i < quantity; i++){
      Product product = new Product("Product: " + i, LocalDate.now(), new BigDecimal(i));
      productRepository.save(product);
    }
    return "Generated";
  }
}
