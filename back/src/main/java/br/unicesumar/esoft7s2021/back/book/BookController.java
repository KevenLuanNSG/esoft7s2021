package br.unicesumar.esoft7s2021.back.book;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {
  private List<Book> books = new ArrayList<>();

  public BookController(){
    books.add(new Book("The Game of Thrones", "George R. R. Martin", 704));
    books.add(new Book("The Clash of Kings", "George R. R. Martin", 787));
    books.add(new Book("The Storm of Swords", "George R. R. Martin", 992));
  }
  @GetMapping
  public List<Book> get(){
    return this.books;
  }

  @PostMapping
  public String post(@RequestBody Book newBook){
    if(this.books.contains(newBook)){
      throw new RuntimeException("Livro duplicado!");
    }
    this.books.add(newBook);
    return newBook.getId();
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id){
    this.books = this.books.stream()
            .filter(b -> !b.getId().equals(id))
            .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public Book getById(@PathVariable("id") String id){
    return this.books.stream().filter(b -> b.getId().equals(id)).findFirst().orElseGet(Book::new);
  }

  @PutMapping("/{id}")
  public String editBook(@PathVariable String id, @RequestBody Book editedBook){
    this.books = this.books.stream()
            .filter(b -> !b.getId().equals(id))
            .collect(Collectors.toList());
    this.books.add(editedBook);
    return editedBook.getId();
  }

}
