package tn.esprit.microservice5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.microservice5.entities.Abonnement;

import java.time.LocalDate;
import java.util.List;

public interface AbonnementRepo extends JpaRepository<Abonnement, Long> {

    @Query("SELECT a.montant, COUNT(a) FROM Abonnement a GROUP BY a.montant")
    List<Object[]> countAbonnementsByMontant();

}