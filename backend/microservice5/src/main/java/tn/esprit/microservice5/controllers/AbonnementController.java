package tn.esprit.microservice5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice5.entities.Abonnement;
import tn.esprit.microservice5.services.AbonnementService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/abonnements")
public class AbonnementController {

    @Autowired
    private AbonnementService abonnementService;

    @GetMapping
    public List<Abonnement> getAllAbonnements() {
        return abonnementService.getAllAbonnements();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Abonnement> getAbonnementById(@PathVariable Long id) {
        return abonnementService.getAbonnementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public Abonnement createAbonnement(@RequestBody Abonnement abonnement) {
        return abonnementService.createAbonnement(abonnement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abonnement> updateAbonnement(@PathVariable Long id, @RequestBody Abonnement abonnementDetails) {
        try {
            return ResponseEntity.ok(abonnementService.updateAbonnement(id, abonnementDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbonnement(@PathVariable Long id) {
        abonnementService.deleteAbonnement(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/stats")
    public ResponseEntity<?> getAbonnementStats() {
        return ResponseEntity.ok(abonnementService.getAbonnementStats());
    }


}