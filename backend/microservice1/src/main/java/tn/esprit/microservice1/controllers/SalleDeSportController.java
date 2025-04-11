package tn.esprit.microservice1.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice1.entities.SalleDeSport;
import tn.esprit.microservice1.services.SalleDeSportService;

import java.util.List;

@RestController
@RequestMapping("/mic1/salles")
public class SalleDeSportController {
    
    private final SalleDeSportService salleDeSportService;
    
    @Autowired
    public SalleDeSportController(SalleDeSportService salleDeSportService) {
        this.salleDeSportService = salleDeSportService;
    }
    
    @GetMapping
    public ResponseEntity<List<SalleDeSport>> getAllSalles() {
        return ResponseEntity.ok(salleDeSportService.getAllSalles());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SalleDeSport> getSalleById(@PathVariable Integer id) {
        return ResponseEntity.ok(salleDeSportService.getSalleById(id));
    }
    
    @PostMapping
    public ResponseEntity<SalleDeSport> createSalle(@RequestBody SalleDeSport salle) {
        return new ResponseEntity<>(salleDeSportService.createSalle(salle), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SalleDeSport> updateSalle(@PathVariable Integer id, @RequestBody SalleDeSport salle) {
        return ResponseEntity.ok(salleDeSportService.updateSalle(id, salle));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalle(@PathVariable Integer id) {
        salleDeSportService.deleteSalle(id);
        return ResponseEntity.noContent().build();
    }
} 