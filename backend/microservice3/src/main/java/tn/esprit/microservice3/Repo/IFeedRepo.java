package tn.esprit.microservice3.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.microservice3.Model.Food;

@Repository
public interface IFeedRepo extends JpaRepository<Food, Long> {
}
