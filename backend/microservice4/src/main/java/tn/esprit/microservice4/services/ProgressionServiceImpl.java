package tn.esprit.microservice4.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tn.esprit.microservice4.entities.PlanEntrainement;
import tn.esprit.microservice4.entities.Progression;
import tn.esprit.microservice4.repositories.PlanEntrainementRepository;
import tn.esprit.microservice4.repositories.ProgressionRepository;

import java.time.LocalDate;

@Service
public class ProgressionServiceImpl implements ProgressionService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ProgressionRepository progressionRepository;

    @Autowired
    private PlanEntrainementRepository planEntrainementRepository;

    private static final String USER_SERVICE_URL = "http://user-microservice/users";

    @Override
    public Progression demarrerPlan(int userId, int planId) {
        // Vérifier si le plan existe
        PlanEntrainement plan = planEntrainementRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan introuvable"));

        // Vérifier si l'utilisateur existe dans le user-microservice
        if (!verifierUtilisateur(userId)) {
            throw new RuntimeException("Utilisateur introuvable");
        }

        // Vérifier si l'utilisateur a déjà commencé ce plan
        if (progressionRepository.findByUserIdAndPlanId(userId, planId) != null) {
            throw new RuntimeException("L'utilisateur a déjà commencé ce plan");
        }

        // Créer une nouvelle progression
        Progression progression = new Progression(plan, userId, LocalDate.now(), calculerTotalSeances(plan));
        return progressionRepository.save(progression);
    }

    @Override
    public void marquerSeanceTerminee(int progressionId) {
        Progression progression = progressionRepository.findById(progressionId)
                .orElseThrow(() -> new RuntimeException("Progression introuvable"));
        progression.setSeancesTerminees(progression.getSeancesTerminees() + 1);
        progression.setDateDerniereMiseAJour(LocalDate.now());
        progressionRepository.save(progression);
    }

    @Override
    public Progression obtenirProgression(int progressionId) {
        return progressionRepository.findById(progressionId)
                .orElseThrow(() -> new RuntimeException("Progression introuvable"));
    }

    private boolean verifierUtilisateur(int userId) {
        try {
            String url = USER_SERVICE_URL + "/" + userId;
            Boolean exists = restTemplate.getForObject(url, Boolean.class);
            return Boolean.TRUE.equals(exists);
        } catch (Exception e) {
            return false; // Retourner false en cas d'erreur réseau ou utilisateur introuvable
        }
    }

    private int calculerTotalSeances(PlanEntrainement plan) {
        return plan.getDuree(); // Exemple simplifié
    }
}