package tn.esprit.microservice4.repositories;

import org.springframework.stereotype.Repository;
import  tn.esprit.microservice4.entities.PlanEntrainement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface PlanEntrainementRepository extends JpaRepository<PlanEntrainement, Integer> {
}

