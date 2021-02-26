package br.unicesumar.esoft7s2021.back.cor;

import lombok.Data;

import java.util.UUID;

@Data
public class Cor {
    private String id;
    private String sigla;
    private String nome;

    public Cor(){
        this.id = UUID.randomUUID().toString();
    }

    public Cor(String sigla, String nome){
        this();
        this.sigla = sigla;
        this.nome = nome;
    }
}
