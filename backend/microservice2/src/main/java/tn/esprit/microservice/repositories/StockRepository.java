package tn.esprit.microservice.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.microservice.entities.StockItem;

@Repository
public interface StockRepository extends JpaRepository<StockItem, Long> {
    StockItem findByItemCode(String itemCode);
    boolean existsByItemCode(String itemCode);
}