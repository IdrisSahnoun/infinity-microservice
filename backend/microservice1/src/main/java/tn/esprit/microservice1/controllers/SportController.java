package tn.esprit.microservice1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice1.entities.Sport;
import tn.esprit.microservice1.entities.SalleDeSport;
import tn.esprit.microservice1.services.SportService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/sports")
public class SportController {
    
    private final SportService sportService;
    
    @Autowired
    public SportController(SportService sportService) {
        this.sportService = sportService;
    }
    
    @GetMapping
    public ResponseEntity<List<Sport>> getAllSports() {
        return ResponseEntity.ok(sportService.getAllSports());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sport> getSportById(@PathVariable Integer id) {
        return ResponseEntity.ok(sportService.getSportById(id));
    }
    
    @PostMapping
    public ResponseEntity<Sport> createSport(@RequestBody Sport sport) {
        return new ResponseEntity<>(sportService.createSport(sport), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Sport> updateSport(@PathVariable Integer id, @RequestBody Sport sport) {
        return ResponseEntity.ok(sportService.updateSport(id, sport));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSport(@PathVariable Integer id) {
        sportService.deleteSport(id);
        return ResponseEntity.noContent().build();
    }
    
    // Relationship management endpoints
    @PostMapping("/{sportId}/salles/{salleId}")
    public ResponseEntity<Void> assignSportToSalle(
            @PathVariable Integer sportId,
            @PathVariable Integer salleId) {
        sportService.assignSportToSalle(sportId, salleId);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{sportId}/salles/{salleId}")
    public ResponseEntity<Void> removeSportFromSalle(
            @PathVariable Integer sportId,
            @PathVariable Integer salleId) {
        sportService.removeSportFromSalle(sportId, salleId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/{sportId}/salles")
    public ResponseEntity<Set<SalleDeSport>> getSallesBySportId(@PathVariable Integer id) {
        return ResponseEntity.ok(sportService.getSallesBySportId(id));
    }
} 