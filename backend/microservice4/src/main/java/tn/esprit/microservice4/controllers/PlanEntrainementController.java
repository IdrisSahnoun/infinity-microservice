package tn.esprit.microservice4.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice4.entities.PlanEntrainement;
import tn.esprit.microservice4.services.PlanEntrainementService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor // Injection de dépendances via constructeur
public class PlanEntrainementController {

    @Autowired
    private PlanEntrainementService planEntrainementService;

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
