package tn.esprit.microservice5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice5.entities.Abonnement;
import tn.esprit.microservice5.repositories.AbonnementRepo;


import java.util.List;

@Service
public class AbonnementService {

    private final AbonnementRepo abonnementRepo;

    @Autowired
    public AbonnementService(AbonnementRepo abonnementRepo) {
        this.abonnementRepo = abonnementRepo;
    }

    public List<Abonnement> getAllAbonnements() {
        return abonnementRepo.findAll();
    }

    public Abonnement getAbonnementById(Long id) {
        return abonnementRepo.findById(id).orElse(null);
    }

    public Abonnement createAbonnement(Abonnement abonnement) {
        return abonnementRepo.save(abonnement);
    }

    public Abonnement updateAbonnement(Long id, Abonnement abonnementDetails) {
        if (!abonnementRepo.existsById(id)) {
            throw new RuntimeException("Salle not found with id: " + id);
        }
        abonnementDetails.setId(id);
        return abonnementRepo.save(abonnementDetails);    }

    public void deleteAbonnement(Long id) {
        if (!abonnementRepo.existsById(id)) {
            throw new RuntimeException("Salle not found with id: " + id);
        }
        abonnementRepo.deleteById(id);
    }
}