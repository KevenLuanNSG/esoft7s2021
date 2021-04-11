package br.unicesumar.esoft7s2021.back.color;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colors")
public class ColorController {
    @Autowired
    private ColorService colorService;

    @GetMapping
    public Page<Color> getWithPage(Pageable pageable, @RequestParam(required = false) String search){
        return colorService.getAllWithPage(pageable, search);
    }

    @GetMapping("/without-page")
    public List<Color> get(@RequestParam(required = false) String search){
        return colorService.getAll(search);
    }

    @PostMapping
    public Color save(@RequestBody Color color){
        return colorService.save(color);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        colorService.deleteById(id);
    }

    @GetMapping("/{id}")
    public Color getById(@PathVariable("id") String id){
        return colorService.getById(id);
    }

    @PutMapping("/{id}")
    public Color editColor(@PathVariable String id, @RequestBody Color color){
        return colorService.save(color);
    }
}