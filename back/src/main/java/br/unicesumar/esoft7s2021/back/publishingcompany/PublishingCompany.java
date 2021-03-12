package br.unicesumar.esoft7s2021.back.publishingcompany;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PublishingCompany {
  @Getter
  @Id
  @EqualsAndHashCode.Include
  private String id;
  @Getter
  @Setter
  private String name;
  @Getter
  @Setter
  private LocalDate fundation;
  @Getter
  @Setter
  @Column(scale = 2)
  private BigDecimal averageBilling;

  public PublishingCompany(){
    this.id = UUID.randomUUID().toString();
  }

  public PublishingCompany(String name, LocalDate fundation, BigDecimal averageBilling){
    this();
    this.name = name;
    this.fundation = fundation;
    this.averageBilling = averageBilling;
  }

}
