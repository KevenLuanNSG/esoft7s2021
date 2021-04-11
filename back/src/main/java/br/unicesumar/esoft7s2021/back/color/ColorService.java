package br.unicesumar.esoft7s2021.back.color;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ColorService {
  @Autowired
  private ColorRepository colorRepository;

  public Page<Color> getAllWithPage(Pageable pageable, String search){
    if(search == null || search.length() == 0){
      return colorRepository.findAll(pageable);
    }
    return colorRepository.findByNameSearchPage(pageable, search);
  }

  public List<Color> getAll(String search){
    if(search == null || search.length() == 0){
      return colorRepository.findAll();
    }
    return colorRepository.findByNameSearch(search);
  }

  public Color getById(String id){
    return colorRepository.findById(id).orElseGet(Color::new);
  }

  public void deleteById(String id){
    colorRepository.deleteById(id);
  }

  public Color save(Color color){
    return colorRepository.save(color);
  }
}