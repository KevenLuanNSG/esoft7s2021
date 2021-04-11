package br.unicesumar.esoft7s2021.back.color;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Color {
    @Getter
    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Getter
    @Setter
    private String nick;
    @Getter
    @Setter
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
