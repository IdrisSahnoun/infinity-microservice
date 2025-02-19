package tn.esprit.microservice4.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice4.entities.PlanEntrainement;
import tn.esprit.microservice4.repositories.PlanEntrainementRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PlanEntrainementService {

    private final PlanEntrainementRepository planEntrainementRepository;

    // Constructor for injecting PlanEntrainementRepository
    @Autowired
    public PlanEntrainementService(PlanEntrainementRepository planEntrainementRepository) {
        this.planEntrainementRepository = planEntrainementRepository;
    }

    // Ajouter un plan d'entraînement
    public PlanEntrainement savePlanEntrainement(PlanEntrainement planEntrainement) {
        return planEntrainementRepository.save(planEntrainement);
    }

    // Récupérer tous les plans d'entraînement
    public List<PlanEntrainement> getAllPlans() {
        return planEntrainementRepository.findAll();
    }

    // Récupérer un plan par ID
    public Optional<PlanEntrainement> getPlanById(int id) {
        return planEntrainementRepository.findById(id);
    }

    // Mettre à jour un plan
    public PlanEntrainement updatePlanEntrainement(int id, PlanEntrainement updatedPlan) {
        Optional<PlanEntrainement> optionalPlan = planEntrainementRepository.findById(id);
        if (optionalPlan.isPresent()) {
            PlanEntrainement existingPlan = optionalPlan.get();
            existingPlan.setTitre(updatedPlan.getTitre());
            existingPlan.setDescription(updatedPlan.getDescription());
            existingPlan.setDuree(updatedPlan.getDuree());
            return planEntrainementRepository.save(existingPlan);
        } else {
            throw new RuntimeException("Plan d'entraînement non trouvé");
        }
    }

    // Supprimer un plan
    public void deletePlanEntrainement(int id) {
        planEntrainementRepository.deleteById(id);
    }
}
