package br.unicesumar.esoft7s2021.back.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  @Autowired
  private ProductService productService;

  @GetMapping
  public Page<Product> getWithPage(Pageable pageable, @RequestParam(required = false) String search){
    return productService.getAllWithPage(pageable, search);
  }

  @GetMapping("/without-page")
  public List<Product> get(@RequestParam(required = false) String search){
    return productService.getAll(search);
  }

  @PostMapping
  public Product save(@RequestBody Product product){
    return productService.save(product);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id){
    productService.deleteById(id);
  }

  @GetMapping("/{id}")
  public Product getById(@PathVariable("id") String id){
   return productService.getById(id);
  }

  @PutMapping("/{id}")
  public Product editProduct(@PathVariable String id, @RequestBody Product product){
    return productService.save(product);
  }

  @GetMapping("/generate/{quantity}")
  public String genarateProducts(@PathVariable Long quantity){
    return productService.generateProducts(quantity);
  }
}
