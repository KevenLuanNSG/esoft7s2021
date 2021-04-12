package br.unicesumar.esoft7s2021.back.product;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ProductInvalidException extends RuntimeException{
  public ProductInvalidException(String message) {
    super(message);
  }
}
