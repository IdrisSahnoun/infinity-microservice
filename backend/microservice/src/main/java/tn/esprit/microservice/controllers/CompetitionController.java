package tn.esprit.microservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice.entities.Competition;
import tn.esprit.microservice.services.ICompetitionService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // Injects dependencies via constructor
public class CompetitionController {

    private final ICompetitionService competitionService;

    // Get all competitions
    @GetMapping
    public List<Competition> getAllCompetitions() {
        return competitionService.getAllCompetitions();
    }

    // Get a competition by ID
    @GetMapping("/{id}")
    public ResponseEntity<Competition> getCompetitionById(@PathVariable Long id) {
        return competitionService.getCompetitionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new competition
    @PostMapping("/create")
    public Competition createCompetition(@RequestBody Competition competition) {
        return competitionService.createCompetition(competition);
    }

    // Update an existing competition
    @PutMapping("/{id}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable Long id, @RequestBody Competition competitionDetails) {
        return ResponseEntity.ok(competitionService.updateCompetition(id, competitionDetails));
    }

    // Delete a competition
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompetition(@PathVariable Long id) {
        competitionService.deleteCompetition(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/test")
    public String test() {
        return "Competition API is working!";
    }
    @GetMapping("/search")
    public List<Competition> searchCompetitions(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate,
            @RequestParam(required = false) String location) {
        return competitionService.searchCompetitions(name, startDate, endDate, location);
    }
}
