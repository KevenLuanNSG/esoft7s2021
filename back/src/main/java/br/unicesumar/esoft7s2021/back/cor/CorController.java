package br.unicesumar.esoft7s2021.back.cor;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cores")
public class CorController {
    private List<Cor> cores = new ArrayList<>();

    public CorController(){
        cores.add(new Cor("BLK", "Black"));
        cores.add(new Cor("RD", "Red"));
        cores.add(new Cor("GRN", "Green"));
    }
    @GetMapping
    public List<Cor> get(){
        return this.cores;
    }

    @PostMapping
    public String post(@RequestBody Cor nova){
        if(this.cores.contains(nova)){
            throw new RuntimeException("Cor duplicada!");
        }
        this.cores.add(nova);
        return nova.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        this.cores = this.cores.stream()
                .filter(cor -> !cor.getId().equals(id))
                .collect(Collectors.toList());
    }
}
