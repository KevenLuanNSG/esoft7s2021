package br.unicesumar.esoft7s2021.back.keven.book;

import lombok.Data;

import java.util.UUID;

@Data
public class Book {
  private String id;
  private String title;
  private String author;
  private int numberOfPages;

  public Book(){
    this.id = UUID.randomUUID().toString();
  }

  public Book(String title, String author, int numberOfPages){
    this();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
  }
}
