package br.unicesumar.esoft7s2021.back.publishingcompany;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PublishingCompanyRepository extends JpaRepository<PublishingCompany, String> {
  @Query(nativeQuery = true, value = "select p.* from publishing_company p where p.name ilike %:search%")
  List<PublishingCompany> findByNameSearch(@Param("search") String search);

  @Query(nativeQuery = true, value = "select p.* from publishing_company p where p.name ilike %:search%",
          countQuery = "select count(p.*) from publishing_company p where p.name ilike %:search%")
  Page<PublishingCompany> findByNameSearchPage(Pageable pageable, @Param("search") String search);
}
