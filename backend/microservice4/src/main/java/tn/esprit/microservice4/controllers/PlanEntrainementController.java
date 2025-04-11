package tn.esprit.microservice4.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice4.entities.PlanEntrainement;
import tn.esprit.microservice4.entities.Progression;
import tn.esprit.microservice4.services.PlanEntrainementService;
import tn.esprit.microservice4.services.ProgressionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
@RequiredArgsConstructor // Injection de dépendances via constructeur
public class PlanEntrainementController {

    @Autowired
    private PlanEntrainementService planEntrainementService;



    @Autowired
    private ProgressionService progressionService;

    @PostMapping("/demarrer/{userId}/{planId}")
    public Progression demarrerPlan(@PathVariable int userId, @PathVariable int planId) {
        return progressionService.demarrerPlan(userId, planId);
    }

    @PutMapping("/marquer-seance-terminee/{progressionId}")
    public void marquerSeanceTerminee(@PathVariable int progressionId) {
        progressionService.marquerSeanceTerminee(progressionId);
    }

    @GetMapping("/{progressionId}")
    public Progression obtenirProgression(@PathVariable int progressionId) {
        return progressionService.obtenirProgression(progressionId);
    }


    // Ajouter un plan d'entraînement
    @PostMapping("/add")
    public PlanEntrainement addPlan(@RequestBody PlanEntrainement planEntrainement) {
        return planEntrainementService.savePlanEntrainement(planEntrainement);
    }

    // Récupérer tous les plans d'entraînement
    @GetMapping("/list")
    public List<PlanEntrainement> getAllPlans() {
        return planEntrainementService.getAllPlans();
    }

    // Récupérer un plan par ID
    @GetMapping("/{id}")
    public Optional<PlanEntrainement> getPlanById(@PathVariable int id) {
        return planEntrainementService.getPlanById(id);
    }

    // Mettre à jour un plan
    @PutMapping("/update/{id}")
    public PlanEntrainement updatePlan(@PathVariable int id, @RequestBody PlanEntrainement updatedPlan) {
        return planEntrainementService.updatePlanEntrainement(id, updatedPlan);
    }

    // Supprimer un plan
    @DeleteMapping("/delete/{id}")
    public void deletePlan(@PathVariable int id) {
        planEntrainementService.deletePlanEntrainement(id);
    }

    // Test de fonctionnement
    @GetMapping("/test")
    public String test() {
        return "Plan d'entraînement API is working!";
    }
}
