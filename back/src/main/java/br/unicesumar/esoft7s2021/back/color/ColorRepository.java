package br.unicesumar.esoft7s2021.back.color;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface ColorRepository extends JpaRepository<Color, String> {
  @Query(nativeQuery = true, value = "select c.* from color c where c.name ilike %:search%")
  List<Color> findByNameSearch(@Param("search") String search);

  @Query(nativeQuery = true, value = "select c.* from color c where c.name ilike %:search%",
          countQuery = "select count(c.*) from color c where c.name ilike %:search%")
  Page<Color> findByNameSearchPage(Pageable pageable, @Param("search") String search);
}