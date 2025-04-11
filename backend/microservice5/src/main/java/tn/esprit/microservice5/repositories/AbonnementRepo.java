package tn.esprit.microservice5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.microservice5.entities.Abonnement;

public interface AbonnementRepo extends JpaRepository<Abonnement, Long> {

}
