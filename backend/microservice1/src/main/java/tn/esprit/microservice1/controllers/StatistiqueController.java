package tn.esprit.microservice1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice1.entities.SalleDeSport;
import tn.esprit.microservice1.services.StatistiqueService;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Controller for statistics-related endpoints
 * Accessible directly and through gateway
 */
@RestController
@RequestMapping("/api/statistiques")
public class StatistiqueController {

    @Autowired
    private StatistiqueService statistiqueService;

    @GetMapping("/salles")
    public ResponseEntity<Map<String, Object>> getStatistiquesSalles() {
        System.out.println("StatistiqueController: getStatistiquesSalles called");
        return ResponseEntity.ok(statistiqueService.getStatistiquesSalles());
    }

    @GetMapping("/recommandations")
    public ResponseEntity<List<SalleDeSport>> getRecommandationsSalles(
            @RequestParam String ville,
            @RequestParam Double prixMax,
            @RequestParam Set<String> sportsPreferes) {
        System.out.println("StatistiqueController: getRecommandationsSalles called with ville=" + ville);
        return ResponseEntity.ok(statistiqueService.getRecommandationsSalles(ville, prixMax, sportsPreferes));
    }

    @GetMapping("/tendances")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getTendancesParVille() {
        System.out.println("StatistiqueController: getTendancesParVille called");
        return ResponseEntity.ok(statistiqueService.getTendancesParVille());
    }
} 
