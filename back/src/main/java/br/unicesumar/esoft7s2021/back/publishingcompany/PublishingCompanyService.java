package br.unicesumar.esoft7s2021.back.publishingcompany;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PublishingCompanyService {
  @Autowired
  private PublishingCompanyRepository publishingCompanyRepository;

  public Page<PublishingCompany> getAllWithPage(Pageable pageable, String search){
    if(search == null || search.length() == 0){
      return publishingCompanyRepository.findAll(pageable);
    }
    return publishingCompanyRepository.findByNameSearchPage(pageable, search);
  }

  public List<PublishingCompany> getAll(String search){
    if(search == null || search.length() == 0){
      return publishingCompanyRepository.findAll();
    }
    return publishingCompanyRepository.findByNameSearch(search);
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
