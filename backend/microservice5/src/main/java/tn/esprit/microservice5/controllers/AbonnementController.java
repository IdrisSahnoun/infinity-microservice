package tn.esprit.microservice5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice5.entities.Abonnement;
import tn.esprit.microservice5.repositories.AbonnementRepo;
import tn.esprit.microservice5.services.AbonnementService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/abonnements")
public class AbonnementController {

    private final AbonnementService abonnementService;

    @Autowired
    public AbonnementController(AbonnementService abonnementService) {
        this.abonnementService = abonnementService;
    }

    @GetMapping
    public ResponseEntity<List<Abonnement>> getAllAbonnements() {
        return ResponseEntity.ok(abonnementService.getAllAbonnements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Abonnement> getAbonnementById(@PathVariable Long id) {
        return ResponseEntity.ok(abonnementService.getAbonnementById(id));
    }

    @PostMapping
    public ResponseEntity<Abonnement> createAbonnement(@RequestBody Abonnement abonnement) {
        return new ResponseEntity<>(abonnementService.createAbonnement(abonnement), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abonnement> updateAbonnement(@PathVariable Long id, @RequestBody Abonnement abonnementDetails) {
        return ResponseEntity.ok(abonnementService.updateAbonnement(id, abonnementDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbonnement(@PathVariable Long id) {
        abonnementService.deleteAbonnement(id);
        return ResponseEntity.noContent().build();
    }
}