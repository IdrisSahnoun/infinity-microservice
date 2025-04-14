package tn.esprit.microservice5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice5.entities.Abonnement;
import tn.esprit.microservice5.repositories.AbonnementRepo;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AbonnementService {

    @Autowired
    private AbonnementRepo abonnementRepo;

    public List<Abonnement> getAllAbonnements() {
        return abonnementRepo.findAll();
    }

    public Optional<Abonnement> getAbonnementById(Long id) {
        return abonnementRepo.findById(id);
    }

    public Abonnement createAbonnement(Abonnement abonnement) {
        return abonnementRepo.save(abonnement);
    }

    public Abonnement updateAbonnement(Long id, Abonnement abonnementDetails) {
        Abonnement abonnement = abonnementRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Abonnement not found"));
        abonnement.setDate_debut(abonnementDetails.getDate_debut());
        abonnement.setDate_fin(abonnementDetails.getDate_fin());
        abonnement.setMontant(abonnementDetails.getMontant());
        return abonnementRepo.save(abonnement);
    }

    public void deleteAbonnement(Long id) {
        abonnementRepo.deleteById(id);
    }

    public Map<String, Object> getAbonnementStats() {
        List<Abonnement> abonnements = abonnementRepo.findAll();
        double totalMontant = abonnements.stream().mapToDouble(Abonnement::getMontant).sum();
        double averageMontant = abonnements.isEmpty() ? 0 : totalMontant / abonnements.size();

        // Add statistics grouped by montant
        List<Object[]> montantStatsRaw = abonnementRepo.countAbonnementsByMontant();
        Map<Double, Long> montantStats = new HashMap<>();
        for (Object[] row : montantStatsRaw) {
            Double montant = (Double) row[0];
            Long count = (Long) row[1];
            montantStats.put(montant, count);
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalMontant", totalMontant);
        stats.put("averageMontant", averageMontant);
        stats.put("montantStats", montantStats); // Include grouped stats
        return stats;
    }

}