package tn.esprit.microservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice.entities.Membre;
import tn.esprit.microservice.services.MembreService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
@RequiredArgsConstructor // Injects dependencies via constructor
public class MembreController {

    @Autowired
    private MembreService membreService;

    // Get all Membres
    @GetMapping("/list")
    public List<Membre> getAllMembres() {
        return membreService.getAllMembres();
    }

    // Get a Membre by ID
    @GetMapping("/{id}")
    public Optional<Membre> getMembreById(@PathVariable int id) {
        return membreService.getMembreById(id);
    }

    // Create a new Membre
    @PostMapping("/add")
    public Membre createMembre(@RequestBody Membre membre) {
        return membreService.createMembre(membre);
    }

    // Update a Membre
    @PutMapping("/update/{id}")
    public Membre updateMembre(@PathVariable int id, @RequestBody Membre membreDetails) {
        return membreService.updateMembre(id, membreDetails);
    }

    // Delete a Membre
    @DeleteMapping("/delete/{id}")
    public void deleteMembre(@PathVariable int id) {
        membreService.deleteMembre(id);
    }


    @GetMapping("/test")
    public String test() {
        return "Competition API is working!";
    }
}
