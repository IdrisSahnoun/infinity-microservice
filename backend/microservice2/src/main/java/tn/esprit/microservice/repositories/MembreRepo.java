package tn.esprit.microservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.microservice.entities.Membre;

public interface MembreRepo extends JpaRepository<Membre, Integer> {
}
