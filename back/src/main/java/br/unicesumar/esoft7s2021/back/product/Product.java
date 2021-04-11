package br.unicesumar.esoft7s2021.back.product;

import br.unicesumar.esoft7s2021.back.color.Color;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Product {
  @Getter
  @Id
  @EqualsAndHashCode.Include
  private String id;
  @Getter
  @Setter
  private String description;
  @Getter
  @Setter
  private LocalDate launch;
  @Getter
  @Setter
  @Column(scale = 2)
  private BigDecimal unitPrice;

  @JsonIgnore
  @Getter
  @Setter
  @ManyToOne
  private Color standardColor;

  public Product(){
    this.id = UUID.randomUUID().toString();
  }

  public Product(String description, LocalDate launch, BigDecimal unitPrice){
    this();
    this.description = description;
    this.launch = launch;
    this.unitPrice = unitPrice;
  }

  //One way to do
  public String getStandardColorName() {
    return this.standardColor != null ? this.standardColor.getName() : "";
  }
  public String getStandardColorId() {
    return this.standardColor != null ? this.standardColor.getId() : "";
  }

  //Another way to do
  public Map<String, Object> getStandardColorVO() {
    Map<String, Object> standardColorVO = new HashMap<>();
    if(this.standardColor != null) {
      standardColorVO.put("id", this.standardColor.getId());
      standardColorVO.put("name", this.standardColor.getName());
    }
    return standardColorVO;
  }
}
