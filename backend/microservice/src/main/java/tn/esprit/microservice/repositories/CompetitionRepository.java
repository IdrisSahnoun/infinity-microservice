package tn.esprit.microservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.microservice.entities.Competition;

import java.util.List;
import java.util.Optional;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {
}
