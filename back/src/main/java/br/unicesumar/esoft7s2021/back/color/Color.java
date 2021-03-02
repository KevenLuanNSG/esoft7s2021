package br.unicesumar.esoft7s2021.back.color;

import lombok.Data;

import java.util.UUID;

@Data
public class Color {
    private String id;
    private String nick;
    private String name;

    public Color(){
        this.id = UUID.randomUUID().toString();
    }

    public Color(String nick, String name){
        this();
        this.nick = nick;
        this.name = name;
    }
}
