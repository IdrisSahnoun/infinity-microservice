package tn.esprit.microservice1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.microservice1.entities.Sport;

public interface SportRepository extends JpaRepository<Sport, Integer> {
} 