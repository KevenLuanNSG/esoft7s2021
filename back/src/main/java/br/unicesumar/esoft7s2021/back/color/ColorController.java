package br.unicesumar.esoft7s2021.back.color;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/colors")
public class ColorController {
    private List<Color> colors = new ArrayList<>();

    public ColorController(){
        colors.add(new Color("BLK", "Black"));
        colors.add(new Color("RD", "Red"));
        colors.add(new Color("GRN", "Green"));
    }
    @GetMapping
    public List<Color> get(){
        return this.colors;
    }

    @PostMapping
    public String post(@RequestBody Color newColor){
        if(this.colors.contains(newColor)){
            throw new RuntimeException("Cor duplicada!");
        }
        this.colors.add(newColor);
        return newColor.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        this.colors = this.colors.stream()
                .filter(color -> !color.getId().equals(id))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Color getById(@PathVariable("id") String id){
        return this.colors.stream().filter(c -> c.getId().equals(id)).findFirst().orElseGet(Color::new);
    }

    @PutMapping("/{id}")
    public String editColor(@PathVariable String id, @RequestBody Color editedColor){
        this.colors = this.colors.stream()
                .filter(color -> !color.getId().equals(id))
                .collect(Collectors.toList());
        this.colors.add(editedColor);
        return editedColor.getId();
    }






}
