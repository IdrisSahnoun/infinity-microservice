package tn.esprit.microservice1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.microservice1.entities.SalleDeSport;

public interface SalleDeSportRepository extends JpaRepository<SalleDeSport, Integer> {
} 