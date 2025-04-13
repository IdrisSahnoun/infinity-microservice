package tn.esprit.microservice4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.microservice4.entities.Progression;

import java.util.List;

@Repository
public interface ProgressionRepository extends JpaRepository<Progression, Integer> {

    // Méthode pour trouver toutes les progressions d'un utilisateur spécifique
    List<Progression> findByUserId(int userId);

    // Méthode pour trouver une progression spécifique d'un utilisateur pour un plan donné
    Progression findByUserIdAndPlanId(int userId, int planId);
}