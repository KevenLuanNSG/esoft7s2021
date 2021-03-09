package br.unicesumar.esoft7s2021.back.product;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Product {
  @Getter
  @Id
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

  public Product(){
    this.id = UUID.randomUUID().toString();
  }

  public Product(String description, LocalDate launch, BigDecimal unitPrice){
    this();
    this.description = description;
    this.launch = launch;
    this.unitPrice = unitPrice;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == this)
      return true;
    if (!(obj instanceof Product)) {
      return false;
    }
    Product product = (Product) obj;
    return Objects.equals(id, product.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

}
