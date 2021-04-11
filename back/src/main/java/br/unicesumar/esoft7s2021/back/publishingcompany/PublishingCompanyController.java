package br.unicesumar.esoft7s2021.back.publishingcompany;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publishing-companies")
public class PublishingCompanyController {
  @Autowired
  private PublishingCompanyService publishingCompanyService;

  @GetMapping
  public Page<PublishingCompany> getWithPage(Pageable pageable, @RequestParam(required = false) String search){
    return publishingCompanyService.getAllWithPage(pageable, search);
  }

  @GetMapping("/without-page")
  public List<PublishingCompany> get(@RequestParam(required = false) String search){
    return publishingCompanyService.getAll(search);
  }

  @PostMapping
  public PublishingCompany save(@RequestBody PublishingCompany publishingCompany){
    return publishingCompanyService.save(publishingCompany);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id){
    publishingCompanyService.deleteById(id);
  }

  @GetMapping("/{id}")
  public PublishingCompany getById(@PathVariable("id") String id){
    return publishingCompanyService.getById(id);
  }

  @PutMapping("/{id}")
  public PublishingCompany editPublishingCompany(@PathVariable String id, @RequestBody PublishingCompany publishingCompany){
    return publishingCompanyService.save(publishingCompany);
  }
}
