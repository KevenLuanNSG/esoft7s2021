package br.unicesumar.esoft7s2021.back.publishingcompany;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PublishingCompanyService {
  @Autowired
  private PublishingCompanyRepository publishingCompanyRepository;

  public List<PublishingCompany> getAll(){
    return publishingCompanyRepository.findAll();
  }

  public PublishingCompany getById(String id){
    return publishingCompanyRepository.findById(id).orElseGet(PublishingCompany::new);
  }

  public void deleteById(String id){
    publishingCompanyRepository.deleteById(id);
  }

  public PublishingCompany save(PublishingCompany publishingCompany){
    return publishingCompanyRepository.save(publishingCompany);
  }
}
