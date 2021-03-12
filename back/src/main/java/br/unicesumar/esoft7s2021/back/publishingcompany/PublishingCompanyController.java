package br.unicesumar.esoft7s2021.back.publishingcompany;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publishing-companies")
public class PublishingCompanyController {
  @Autowired
  private PublishingCompanyService PublishingCompanyService;

  @GetMapping
  public List<PublishingCompany> get(){
    return PublishingCompanyService.getAll();
  }

  @PostMapping
  public PublishingCompany save(@RequestBody PublishingCompany publishingCompany){
    return PublishingCompanyService.save(publishingCompany);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id){
    PublishingCompanyService.deleteById(id);
  }

  @GetMapping("/{id}")
  public PublishingCompany getById(@PathVariable("id") String id){
   return PublishingCompanyService.getById(id);
  }

  @PutMapping("/{id}")
  public PublishingCompany editPublishingCompany(@PathVariable String id, @RequestBody PublishingCompany publishingCompany){
    return PublishingCompanyService.save(publishingCompany);
  }

}
