package br.unicesumar.esoft7s2021.back.product;

import org.springframework.beans.factory.annotation.Autowired;
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
  public List<Product> get(){
    return productService.getAll();
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

}