package br.unicesumar.esoft7s2021.back.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
  @Query(nativeQuery = true, value = "select p.* from product p where p.description ilike %:search% ")
  List<Product> findByDescriptionSearch(@Param("search") String search);
}
